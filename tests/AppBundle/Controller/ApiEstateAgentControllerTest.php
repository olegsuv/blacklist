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
            'comment' => 'Ignore after call',
            'phones' => ['380630000000'],
            'url' => 'http://somesite.ua/room/17',
        ]);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }
}
