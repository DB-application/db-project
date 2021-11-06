<?php
declare(strict_types=1);

namespace App\Event\Api;

use App\Event\Api\Input\CreateEventInput;
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
}