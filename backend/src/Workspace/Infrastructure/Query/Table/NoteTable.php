<?php
declare(strict_types=1);

namespace App\Workspace\Infrastructure\Query\Table;

use App\Common\Infrastructure\Query\TypeConverter;

class NoteTable
{
    public const TABLE_NAME = 'note';

    public const ID = 'id';
    public const NAME = 'name';
    public const CONTENT = 'content';
    public const WORKSPACE_ID = 'workspace_id';

    public const FIELDS = [
        self::ID => TypeConverter::STRING,
        self::NAME => TypeConverter::STRING,
        self::CONTENT => TypeConverter::STRING,
        self::WORKSPACE_ID => TypeConverter::STRING,
    ];
}