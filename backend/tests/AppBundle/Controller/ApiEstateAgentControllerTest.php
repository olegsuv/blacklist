<?php

namespace Tests\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiEstateAgentControllerTest extends WebTestCase
{
    public function testAdd()
    {
        $client = static::createClient();

        $client->request('POST', '/api/v1/estate', [
            'phone' => '380630000000'
        ]);

        $this->assertEquals(201, $client->getResponse()->getStatusCode());
    }
}
