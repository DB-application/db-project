<?php
declare(strict_types=1);

namespace App\Event\Api;

use App\Event\Api\Input\CreateEventInput;
use App\Event\Api\Input\EditEventInput;
use App\Event\App\Data\EventData;
use App\Event\App\Service\EventAppService;

class Api implements ApiInterface
{
    /** @var EventAppService */
    private $appService;

    public function __construct(EventAppService $appService)
    {
        $this->appService = $appService;
    }

    public function createEvent(CreateEventInput $input): string
    {
        //TODO: обработка исключений
        return $this->appService->createEvent($input->getTitle(), $input->getStartDate(), $input->getEndDate(), $input->getOrganizerId(), $input->getDescription(), $input->getPlace());
    }

    public function getEventDataById(string $eventId): ?EventData
    {
        return $this->appService->getEventData($eventId);
    }

    public function editEvent(EditEventInput $input): void
    {
        //TODO: обработка исключений
        $this->appService->editEvent($input->getEventId(), $input->getTitle(), $input->getStartDate(), $input->getEndDate(), $input->getOrganizerId(), $input->getDescription(), $input->getPlace());
    }

    public function removeEvent(string $eventId): void
    {
        //TODO: обработка исключений
        $this->appService->removeEvent($eventId);
    }

    public function getEventsDataByUserId(string $userId): array
    {
        return $this->appService->getUserEvents($userId);
    }

}