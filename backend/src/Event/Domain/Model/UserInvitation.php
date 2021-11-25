<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

use App\Common\Domain\Uuid;

class UserInvitation
{
    /** @var Uuid */
    private $id;
    /** @var Uuid */
    private $userId;
    /** @var Uuid */
    private $eventId;
    /** @var int */
    private $status;

    public function __construct(
        Uuid $id,
        Uuid $userId,
        Uuid $eventId,
        int $status
    )
    {
        $this->id = $id;
        $this->userId = $userId;
        $this->eventId = $eventId;
        $this->status = $status;
    }

    /**
     * @return Uuid
     */
    public function getId(): Uuid
    {
        return $this->id;
    }

    /**
     * @return Uuid
     */
    public function getUserId(): Uuid
    {
        return $this->userId;
    }

    /**
     * @return Uuid
     */
    public function getEventId(): Uuid
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