import React from 'react';
import { Table } from 'antd';

const StackCallTable = (props) => {

    const columns = [
        {
            title: 'Parameter Type',
            dataIndex: ['associated_parameter_type', 'parameter_type'],
            width: '25%',
            key: 'parameter_type_col',
            //sorter: (a, b) => a.associated_parameter_type.parameter_type.localeCompare(b.associated_parameter_type.parameter_type)
        },
        
    ];
    return (
        <Table
            bordered
            dataSource={props.stack_call_list}
            columns={columns}
            pagination={{ showSizeChanger: true, }}
        />
    );
};

export default StackCallTable;