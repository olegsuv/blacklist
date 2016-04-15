<?php

namespace AppBundle\Entity;

/**
 * SAdvertisement
 */
class SAdvertisement
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $title;

    /**
     * @var string
     */
    private $comment;

    /**
     * @var string
     */
    private $description;

    /**
     * @var string
     */
    private $url;

    /**
     * @var \DateTime
     */
    private $inserted;

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $phoneLink;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->phoneLink = new \Doctrine\Common\Collections\ArrayCollection();
    }

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
     * Set title
     *
     * @param string $title
     *
     * @return SAdvertisement
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set comment
     *
     * @param string $comment
     *
     * @return SAdvertisement
     */
    public function setComment($comment)
    {
        $this->comment = $comment;

        return $this;
    }

    /**
     * Get comment
     *
     * @return string
     */
    public function getComment()
    {
        return $this->comment;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return SAdvertisement
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set url
     *
     * @param string $url
     *
     * @return SAdvertisement
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set inserted
     *
     * @param \DateTime $inserted
     *
     * @return SAdvertisement
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

    /**
     * Add phoneLink
     *
     * @param \AppBundle\Entity\SAdvertisementToPhone $phoneLink
     *
     * @return SAdvertisement
     */
    public function addPhoneLink(\AppBundle\Entity\SAdvertisementToPhone $phoneLink)
    {
        $this->phoneLink[] = $phoneLink;

        return $this;
    }

    /**
     * Remove phoneLink
     *
     * @param \AppBundle\Entity\SAdvertisementToPhone $phoneLink
     */
    public function removePhoneLink(\AppBundle\Entity\SAdvertisementToPhone $phoneLink)
    {
        $this->phoneLink->removeElement($phoneLink);
    }

    /**
     * Get phoneLink
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPhoneLink()
    {
        return $this->phoneLink;
    }
}
