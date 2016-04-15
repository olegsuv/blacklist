<?php

namespace Tests\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiEstateAgentControllerTest extends WebTestCase
{
    public function testAdd()
    {
        $client = static::createClient();

        $container = static::$kernel->getContainer();

        $container->get('rqs.database.tester')->clear();

        $client->request('POST', '/api/v1/estate.json', [
            'phone' => '380630000000',
            'url' => 'http://somesite.ua/room/17'
        ]);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testFindPhone()
    {
        $client = static::createClient();

        $client->request('GET', '/api/v1/estate/find.json', [
            'phone' => '380630000000'
        ]);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        $expect = [
            'success' => true,
            'items' => [
                'phone' => '380630000000',
                'url' => 'http://somesite.ua/room/17',
            ]
        ];

        $this->assertEquals($expect, json_decode($client->getResponse()->getContent(), true));
    }

    public function testFindUrl()
    {
        $client = static::createClient();

        $client->request('GET', '/api/v1/estate/find.json', [
            'url' => 'http://somesite.ua/room/17'
        ]);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        $expect = [
            'success' => true,
            'items' => [
                [
                    'phone' => '380630000000',
                    'url' => 'http://somesite.ua/room/17',
                ]
            ]
        ];

        $this->assertEquals($expect, json_decode($client->getResponse()->getContent(), true));
    }
}
