<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

use App\Common\Domain\Uuid;

class Event
{
    /** @var Uuid */
    private $id;
    /** @var string */
    private $name;
    /** @var string */
    private $description;
    /** @var \DateTimeImmutable */
    private $startDate;
    /** @var \DateTimeImmutable */
    private $endDate;
    /** @var string */
    private $place;
    /** @var Uuid */
    private $organizerId;
    /** @var int|null */
    private $repetitionSchedule;
    /** @var bool */
    private $isRepeatable;

    public function __construct(
        Uuid $id,
        string $name,
        string $description,
        \DateTimeImmutable $startDate,
        \DateTimeImmutable $endDate,
        string $place,
        Uuid $organizerId,
        ?int $repetitionSchedule,
        bool $isRepeatable
    )
    {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->place = $place;
        $this->organizerId = $organizerId;
        $this->repetitionSchedule = $repetitionSchedule;
        $this->isRepeatable = $isRepeatable;
    }

    public function getId(): Uuid
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getStartDate(): \DateTimeImmutable
    {
        return $this->startDate;
    }

    public function getEndDate(): \DateTimeImmutable
    {
        return $this->endDate;
    }

    public function getPlace(): string
    {
        return $this->place;
    }

    public function getOrganizerId(): Uuid
    {
        return $this->organizerId;
    }

    public function getRepetitionSchedule(): ?int
    {
        return $this->repetitionSchedule;
    }

    public function isRepeatable(): bool
    {
        return $this->isRepeatable;
    }
}