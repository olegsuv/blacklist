<?php

namespace Tests\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Client;

class ApiAllControllerTest extends WebTestCase
{
    public function test()
    {
        $client = static::createClient();

        $container = static::$kernel->getContainer();

        $container->get('rqs.database.tester')->clear();

        $client->request('GET', '/api/v1/estate/advertisement/search/phone.json', [
            'phone' => '380630000000'
        ]);

        $this->assertResponseSuccess($client);
        $expect = [
            'success' => true,
            'items' => []
        ];

        $this->assertResponseData($expect, $client);

        $client->request('POST', '/api/v1/estate/advertisement/add.json', [
            'comment' => 'Ignore after call',
            'phones' => ['380630000000'],
            'url' => 'http://somesite.ua/room/17',
        ]);
        $this->assertResponseSuccess($client);

        $client->request('POST', '/api/v1/estate/advertisement/add.json', [
            'comment' => 'Missing',
            'phones' => ['380630000000', '380631234567'],
            'url' => 'http://somesite.ua/room/18',
        ]);

        $this->assertResponseSuccess($client);

        $client->request('GET', '/api/v1/estate/advertisement/search/phone.json', [
            'phone' => '380630000000'
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
                    'url' => 'http://somesite.ua/room/17',
                ],
            ]
        ];

        $this->assertResponseData($expect, $client);

        $client->request('GET', '/api/v1/estate/advertisement/search/phone.json', [
            'phone' => '380631234567'
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
            ]
        ];

        $this->assertResponseData($expect, $client);

        $client->request('GET', '/api/v1/estate/advertisement/search/url.json', [
            'url' => 'http://somesite.ua/room/17'
        ]);

        $this->assertResponseSuccess($client);

        $expect = [
            'success' => true,
            'items' => [
                [
                    'comment' => 'Ignore after call',
                    'phones' => ['380630000000'],
                    'url' => 'http://somesite.ua/room/17',
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

    private function assertResponseData($expect, Client $client)
    {
        $this->assertEquals($expect, json_decode($client->getResponse()->getContent(), true));
    }
}
