<?php
declare(strict_types=1);

namespace App\Common\Domain;

use Ramsey\Uuid\Uuid as Generator;

class UuidGenerator
{
    public static function generateUuid(): Uuid
    {
        return new Uuid(Generator::uuid4()->toString());
    }
}