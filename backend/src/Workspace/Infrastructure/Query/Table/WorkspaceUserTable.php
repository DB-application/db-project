<?php
declare(strict_types=1);

namespace App\Workspace\Infrastructure\Query\Table;

use App\Common\Infrastructure\Query\TypeConverter;

class WorkspaceUserTable
{
    public const TABLE_NAME = 'workspace_user';

    public const ID = 'id';
    public const USER_ID = 'user_id';
    public const WORKSPACE_ID = 'workspace_id';

    public const WORKSPACE_USER_FIELDS = [
        self::ID => TypeConverter::STRING,
        self::USER_ID => TypeConverter::STRING,
        self::WORKSPACE_ID => TypeConverter::STRING,
    ];
}