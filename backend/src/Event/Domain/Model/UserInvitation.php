<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

class UserInvitation
{
    /** @var string */
    private $id;
    /** @var string */
    private $userId;
    /** @var string */
    private $eventId;
    /** @var int */
    private $status;

    public function __construct(
        string $id,
        string $userId,
        string $eventId,
        int $status
    )
    {
        $this->id = $id;
        $this->userId = $userId;
        $this->eventId = $eventId;
        $this->status = $status;
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getUserId(): string
    {
        return $this->userId;
    }

    /**
     * @return string
     */
    public function getEventId(): string
    {
        return $this->eventId;
    }

    /**
     * @return int
     */
    public function getStatus(): int
    {
        return $this->status;
    }
}