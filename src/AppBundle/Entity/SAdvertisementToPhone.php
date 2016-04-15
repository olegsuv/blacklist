<?php

namespace AppBundle\Entity;

/**
 * SAdvertisementToPhone
 */
class SAdvertisementToPhone
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $advertisementId;

    /**
     * @var integer
     */
    private $phoneId;

    /**
     * @var \AppBundle\Entity\SAdvertisement
     */
    private $advertisement;

    /**
     * @var \AppBundle\Entity\SEstateAgentPhone
     */
    private $phone;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set advertisementId
     *
     * @param integer $advertisementId
     *
     * @return SAdvertisementToPhone
     */
    public function setAdvertisementId($advertisementId)
    {
        $this->advertisementId = $advertisementId;

        return $this;
    }

    /**
     * Get advertisementId
     *
     * @return integer
     */
    public function getAdvertisementId()
    {
        return $this->advertisementId;
    }

    /**
     * Set phoneId
     *
     * @param integer $phoneId
     *
     * @return SAdvertisementToPhone
     */
    public function setPhoneId($phoneId)
    {
        $this->phoneId = $phoneId;

        return $this;
    }

    /**
     * Get phoneId
     *
     * @return integer
     */
    public function getPhoneId()
    {
        return $this->phoneId;
    }

    /**
     * Set advertisement
     *
     * @param \AppBundle\Entity\SAdvertisement $advertisement
     *
     * @return SAdvertisementToPhone
     */
    public function setAdvertisement(\AppBundle\Entity\SAdvertisement $advertisement = null)
    {
        $this->advertisement = $advertisement;

        return $this;
    }

    /**
     * Get advertisement
     *
     * @return \AppBundle\Entity\SAdvertisement
     */
    public function getAdvertisement()
    {
        return $this->advertisement;
    }

    /**
     * Set phone
     *
     * @param \AppBundle\Entity\SEstateAgentPhone $phone
     *
     * @return SAdvertisementToPhone
     */
    public function setPhone(\AppBundle\Entity\SEstateAgentPhone $phone = null)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @return \AppBundle\Entity\SEstateAgentPhone
     */
    public function getPhone()
    {
        return $this->phone;
    }
}
