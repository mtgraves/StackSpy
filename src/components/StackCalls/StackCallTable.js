import React from 'react';
import { Table, Button, Tooltip } from 'antd';
import { FaChartLine } from 'react-icons/fa';

const StackCallTable = (props) => {

    const columns = [
        {
            title: 'ID',
            dataIndex: ['uuid'],
            width: '45%',
            key: 'uuid_col',
        },
        {
            title: 'datetime',
            dataIndex: ['datetime'],
            width: '45%',
            key: 'datetime_col',
        },
        {
            title: null,
            width: '10%',
            key: 'view_plot_col',
            render: (_, record) => {
                return (
                    <Tooltip 
                        key='view_stack_tooltip' 
                        title={'View stack call graph'} 
                    >
                        <Button 
                            onClick={() => props.setCallToView(record)} 
                            icon={<FaChartLine style={{color: "#009933"}}/>}
                        />
                    </Tooltip>
                );
            },
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