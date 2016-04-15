<?php

namespace AppBundle\Entity;

/**
 * SEstateAgentPhone
 */
class SEstateAgentPhone
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $phone;

    /**
     * @var \DateTime
     */
    private $inserted;


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
     * Set phone
     *
     * @param string $phone
     *
     * @return SEstateAgentPhone
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set inserted
     *
     * @param \DateTime $inserted
     *
     * @return SEstateAgentPhone
     */
    public function setInserted($inserted)
    {
        $this->inserted = $inserted;

        return $this;
    }

    /**
     * Get inserted
     *
     * @return \DateTime
     */
    public function getInserted()
    {
        return $this->inserted;
    }
}
