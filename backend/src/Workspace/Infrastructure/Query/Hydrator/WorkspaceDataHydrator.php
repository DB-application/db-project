<?php
declare(strict_types=1);

namespace App\Workspace\Infrastructure\Query\Hydrator;

use App\Common\Infrastructure\Query\TypeConverter;
use App\Workspace\App\Data\WorkspaceData;
use App\Workspace\Infrastructure\Query\Table\WorkspaceTable;

class WorkspaceDataHydrator
{
    public function hydrateRow(array $data): WorkspaceData
    {
        $id = TypeConverter::hydrateValue($data[WorkspaceTable::ID], WorkspaceTable::WORKSPACE_FIELDS[WorkspaceTable::ID]);
        $name = TypeConverter::hydrateValue($data[WorkspaceTable::NAME], WorkspaceTable::WORKSPACE_FIELDS[WorkspaceTable::NAME]);
        $isDefault = TypeConverter::hydrateValue($data[WorkspaceTable::IS_DEFAULT], WorkspaceTable::WORKSPACE_FIELDS[WorkspaceTable::IS_DEFAULT]);
        $ownerId = TypeConverter::hydrateValue($data[WorkspaceTable::OWNER_ID], WorkspaceTable::WORKSPACE_FIELDS[WorkspaceTable::OWNER_ID]);
        return new WorkspaceData($id, $name, $isDefault, $ownerId);
    }
}