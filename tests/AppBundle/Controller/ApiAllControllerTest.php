<?php

namespace Tests\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Client;

class ApiAllControllerTest extends WebTestCase
{
    public function testAddActionValidation()
    {
        $client = static::createClient();

        $client->request('POST', '/api/v1/estate/advertisement/add.json');

        $this->assertResponseError($client, 'Comment required');

        $client->request('POST', '/api/v1/estate/advertisement/add.json', [
            'comment' => ' '
        ]);

        $this->assertResponseError($client, 'Comment required');

        $client->request('POST', '/api/v1/estate/advertisement/add.json', [
            'comment' => 'Page with empty phones',
            'phones' => []
        ]);

        $this->assertResponseError($client, 'Phones required');

        $client->request('POST', '/api/v1/estate/advertisement/add.json', [
            'comment' => 'Page with empty phones',
            'phones' => ['1']
        ]);

        $this->assertResponseError($client, "Invalid phone '1'");

        $client->request('POST', '/api/v1/estate/advertisement/add.json', [
            'comment' => 'Page with empty phones',
            'phones' => ['1', '+38(063) 111-22-33']
        ]);

        $this->assertResponseSuccess($client);
    }

    public function testSearchContacts()
    {
        $client = static::createClient();

        $this->clear();

        $client->request('GET', '/api/v1/estate/advertisement/search.json', [
            'url' => 'http://somesite.ua/room/29',
            'phones' => [
                '380630000000',
                '+38 (063) 000-00-00',
                '380931111111',
                '380932222222',
                'some fantasy phone',
            ]
        ]);

        $this->assertResponseSuccess($client);

        $expect = [
            'success' => true,
            'items' => []
        ];

        $this->assertResponseData($expect, $client);
    }

    public function test()
    {
        $client = static::createClient();

        $this->clear();

        $client->request('POST', '/api/v1/estate/advertisement/add.json', [
            'comment' => 'Ignore after call',
            'phones' => ['380630000000', '(063) 000-00-00'],
            'url' => 'http://somesite.ua/room/23',
        ]);
        $this->assertResponseSuccess($client);

        $client->request('POST', '/api/v1/estate/advertisement/add.json', [
            'comment' => 'Missing',
            'phones' => ['380630000000', '380631234567'],
            'url' => 'http://somesite.ua/room/18',
        ]);

        $this->assertResponseSuccess($client);

        $client->request('GET', '/api/v1/estate/advertisement/search.json', [
            'url' => 'http://somesite.ua/room/29',
            'phones' => [
                '380630000000',
                '+38 (063) 000-00-00',
                '380931111111',
                '380932222222',
                'some fantasy phone',
            ]
        ]);

        $this->assertResponseSuccess($client);

        $expect = [
            'success' => true,
            'items' => [
                [
                    'comment' => 'Missing',
                    'phones' => ['380630000000', '380631234567'],
                    'url' => 'http://somesite.ua/room/18',
                ],
                [
                    'comment' => 'Ignore after call',
                    'phones' => ['380630000000'],
                    'url' => 'http://somesite.ua/room/23',
                ],
            ]
        ];

        $this->assertResponseData($expect, $client);

        $client->request('GET', '/api/v1/estate/advertisement/search.json', [
            'url' => 'http://somesite.ua/room/23',
            'phones' => [
                '0932222222'
            ]
        ]);

        $this->assertResponseSuccess($client);

        $expect = [
            'success' => true,
            'items' => [
                [
                    'comment' => 'Ignore after call',
                    'phones' => ['380630000000'],
                    'url' => 'http://somesite.ua/room/23',
                ],
            ]
        ];

        $this->assertResponseData($expect, $client);

        $client->request('GET', '/api/v1/estate/advertisement/search.json', [
            'url' => 'http://somesite.ua/room/23',
            'phones' => []
        ]);

        $this->assertResponseSuccess($client);

        $expect = [
            'success' => true,
            'items' => [
                [
                    'comment' => 'Ignore after call',
                    'phones' => ['380630000000'],
                    'url' => 'http://somesite.ua/room/23',
                ],
            ]
        ];

        $this->assertResponseData($expect, $client);

        $client->request('GET', '/api/v1/estate/advertisement/phones.json');

        $this->assertResponseSuccess($client);

        $expect = [
            'success' => true,
            'items' => ['380630000000', '380631234567']
        ];

        $this->assertResponseData($expect, $client);
    }

    private function assertResponseSuccess(Client $client)
    {
        $this->assertEquals(Response::HTTP_OK, $client->getResponse()->getStatusCode());
    }

    private function assertResponseError(Client $client, $expect)
    {
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $client->getResponse()->getStatusCode());

        $json = json_decode($client->getResponse()->getContent(), true);

        $this->assertEquals($expect, $json['message']);
    }

    private function assertResponseData($expect, Client $client)
    {
        $this->assertEquals($expect, json_decode($client->getResponse()->getContent(), true));
    }

    private function clear()
    {
        $container = static::$kernel->getContainer();

        $container->get('rqs.database.tester')->clear();
    }
}
