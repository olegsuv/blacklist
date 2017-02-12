<?php

namespace AppBundle\Service;

use Doctrine\Bundle\DoctrineBundle\Registry;
use Doctrine\ORM\Mapping\ClassMetadata;

class DatabaseTesterService
{
    private $doctrine;

    public function __construct(Registry $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    public function truncate(...$entities)
    {
        /* @var $connection \Doctrine\DBAL\Connection */
        $connection = $this->doctrine->getConnection();

        foreach ($entities as $entity) {
            /* @var $metadata ClassMetadata */
            $metadata = $this->doctrine->getManager()->getClassMetadata("AppBundle:$entity");

            $connection->exec("TRUNCATE TABLE {$metadata->table['name']};");
        }
    }

    public function clear()
    {
        $this->truncate(
            'SEstateAgentPhone',
            'SAdvertisementToPhone',
            'SAdvertisement'
        );
    }
}
