<?php

namespace App\Entities;

use App\App;
use Webiny\StdLib\StdLibTrait;

abstract class EntityAbstract
{
    use StdLibTrait;
    abstract protected function _sqlSave();

    abstract protected function _sqlLoad();

    abstract protected function _sqlDelete();

    public function save()
    {
        $this->_onBeforeSave();
        $res = $this->_sqlSave();
        $this->_onAfterSave($res);
        return $res;
    }

    public function load($id)
    {
        if (empty($id)) {
            return $this;
        }
        $this->_id = $id;
        $data = $this->_sqlLoad();
        $this->_populateFromDb($data);
        $this->_onAfterLoad();
        return $this;
    }

    public function delete()
    {
        $this->_onBeforeDelete();
        $res = $this->_sqlDelete();
        $this->_onAfterDelete($res);
        return $res;
    }

    public function populate($data)
    {
        $this->_onBeforePopulate($data);
        foreach ($data as $prop => $value) {
            $property = '_' . $this->_buildPropertyName($prop);
            $this->$property = $value;
        }
        $this->_onAfterPopulate($data);
    }

    protected function _populateFromDb($data)
    {
        if (empty($data)) {
            $this->_id = 0;
            return;
        }
        foreach ($data as $row) {
            foreach ($row as $prop => $value) {
                $property = '_' . $this->_buildPropertyName($prop);

                if (!property_exists($this, $property)) {
                    continue;
                }
                $value = $this->_applyLoadFilter($prop, $value, $row);
                $this->$property = $value;
            }
        }
    }

    protected function _applyLoadFilter($property, $value, &$data)
    {
        $method = '_' . ucfirst($this->_buildPropertyName($property)) . 'LoadFilter';
        if (method_exists($this, $method)) {
            return $this->$method($value, $data);
        } else {
            return $value;
        }
    }

    protected function _buildPropertyName($name)
    {
        $name = str_replace('_', ' ', $name);
        $name = lcfirst(ucwords($name));
        $name = str_replace(' ', '', $name);

        return $name;
    }

    /**
     * @return \App\Lib\Database;
     */
    protected function _getDb(){
		return App::getInstance()->getDb();
	}

    // Events

    protected function _onBeforePopulate($data)
    {
        return false;
    }

    protected function _onBeforeSave()
    {
        return false;
    }

    protected function _onAfterSave()
    {
        return false;
    }

    protected function _onBeforeDelete()
    {
        return false;
    }

    protected function _onAfterPopulate($data)
    {
        return false;
    }

    protected function _onAfterLoad()
    {
        return false;
    }

    protected function _onAfterDelete()
    {
        return false;
    }
}

