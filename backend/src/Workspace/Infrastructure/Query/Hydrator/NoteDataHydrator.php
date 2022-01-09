<?php
declare(strict_types=1);

namespace App\Workspace\Infrastructure\Query\Hydrator;

use App\Common\Infrastructure\Query\TypeConverter;
use App\Workspace\App\Data\NoteData;
use App\Workspace\Infrastructure\Query\Table\NoteTable;

class NoteDataHydrator
{
    public function hydrateRow(array $data): NoteData
    {
        $id = TypeConverter::hydrateValue($data[NoteTable::ID], NoteTable::FIELDS[NoteTable::ID]);
        $name = TypeConverter::hydrateValue($data[NoteTable::NAME], NoteTable::FIELDS[NoteTable::NAME]);
        $content = TypeConverter::hydrateValue($data[NoteTable::CONTENT], NoteTable::FIELDS[NoteTable::CONTENT]);
        $workspaceId = TypeConverter::hydrateValue($data[NoteTable::WORKSPACE_ID], NoteTable::FIELDS[NoteTable::WORKSPACE_ID]);
        return new NoteData($id, $name, $content, $workspaceId);
    }
}