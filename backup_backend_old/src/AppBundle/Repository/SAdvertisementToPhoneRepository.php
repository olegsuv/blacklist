<?php

namespace AppBundle\Repository;

/**
 * SAdvertisementToPhoneRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class SAdvertisementToPhoneRepository extends \Doctrine\ORM\EntityRepository
{
    public function getAdvertisementIdPhoneList(array $idList)
    {
        return $this->createQueryBuilder('a2p')
            ->select('a2p.advertisementId, p.phone')
            ->join('a2p.phone', 'p')
            ->where('a2p.advertisementId IN (:idList)')
            ->setParameter('idList', $idList)
            ->getQuery()
            ->getArrayResult();
    }
}