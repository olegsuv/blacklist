<?php

namespace Tests\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiEstateAgentControllerTest extends WebTestCase
{
    public function test()
    {
        $client = static::createClient();

        $container = static::$kernel->getContainer();

        $container->get('rqs.database.tester')->clear();

        $client->request('POST', '/api/v1/estate/advertisement/add.json', [
            'comment' => 'Ignore after call',
            'phones' => ['380630000000'],
            'url' => 'http://somesite.ua/room/17',
        ]);
        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        $client->request('POST', '/api/v1/estate/advertisement/add.json', [
            'comment' => 'Missing',
            'phones' => ['380630000000'],
            'url' => 'http://somesite.ua/room/18',
        ]);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        $client->request('GET', '/api/v1/estate/advertisement/find/phone.json', [
            'phone' => '380630000000'
        ]);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        $expect = [
            'success' => true,
            'items' => [
                [
                    'comment' => 'Missing',
                    'phones' => ['380630000000'],
                    'url' => 'http://somesite.ua/room/18',
                ],
                [
                    'comment' => 'Ignore after call',
                    'phones' => ['380630000000'],
                    'url' => 'http://somesite.ua/room/17',
                ],
            ]
        ];

        $this->assertEquals($expect, json_decode($client->getResponse()->getContent(), true));

        $client->request('GET', '/api/v1/estate/advertisement/find/url.json', [
            'url' => 'http://somesite.ua/room/17'
        ]);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());

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

        $this->assertEquals($expect, json_decode($client->getResponse()->getContent(), true));

        $client->request('GET', '/api/v1/estate/advertisement/phones.json');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        $expect = [
            'success' => true,
            'items' => ['380630000000']
        ];

        $this->assertEquals($expect, json_decode($client->getResponse()->getContent(), true));

    }
}
