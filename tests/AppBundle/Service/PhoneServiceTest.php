<?php

namespace Tests\AppBundle\Service;

class PhoneServiceTest extends AbstractServiceTest
{
    public function test()
    {

    }

    public function dataProvider()
    {

    }

    private function getService()
    {
        return $this->container->get('est.phone');
    }
}
