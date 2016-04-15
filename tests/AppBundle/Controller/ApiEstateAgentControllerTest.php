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
            'phone' => '380630000000'
        ]);

        $this->assertEquals(201, $client->getResponse()->getStatusCode());
    }

    public function testFind()
    {
        $client = static::createClient();

        $client->request('GET', '/api/v1/estate/find.json', [
            'phone' => '380630000000'
        ]);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        $expect = [
            'exists' => true,
            'data' => [
                'phone' => '380630000000'
            ]
        ];

        $this->assertSame($expect, json_decode($client->getResponse()->getContent(), true));
    }
}
