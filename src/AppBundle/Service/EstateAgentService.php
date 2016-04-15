<?php

namespace AppBundle\Service;

use Doctrine\Bundle\DoctrineBundle\Registry;

class EstateAgentService
{
    private $doctrine;

    public function __construct(Registry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
}
