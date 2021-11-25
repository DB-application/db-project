<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

class InvitationStatus
{
    public const INVITED = 0;
    public const ACCEPTED = 1;
    public const DECLINED = 2;
}