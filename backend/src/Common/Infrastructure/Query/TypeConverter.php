<?php
declare(strict_types=1);

namespace App\Common\Infrastructure\Query;

class TypeConverter
{
    public const STRING = 0;
    public const INTEGER = 1;

    public static function hydrateValue($value, int $valueType)
    {
        switch ($valueType)
        {
            case self::STRING:
                return (string)$value;
            case self::INTEGER:
                return (int)$value;
        }

        return $value;
    }
}