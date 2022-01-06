<?php
declare(strict_types=1);

namespace App\Workspace\Infrastructure\Query\Table;

use App\Common\Infrastructure\Query\TypeConverter;

class WorkspaceTable
{
    public const TABLE_NAME = 'workspace';

    public const ID = 'id';
    public const NAME = 'name';
    public const OWNER_ID = 'owner_id';
    public const IS_DEFAULT = 'is_default';

    public const WORKSPACE_FIELDS = [
        self::ID => TypeConverter::STRING,
        self::NAME => TypeConverter::STRING,
        self::OWNER_ID => TypeConverter::STRING,
        self::IS_DEFAULT => TypeConverter::BOOL,
    ];
}