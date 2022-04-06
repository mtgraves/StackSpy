import React from 'react';
import { PageHeader } from 'antd';
import StackCallTable from './StackCallTable';

class StackCalls extends React.Component {

    state = {
        stack_call_list: [],
    }

    render() {
        return (
            <>
                <PageHeader
                    title='Stack Call Inspector'
                    subTitle='Look at all the things that you did'
                >
                </PageHeader>
                <StackCallTable
                    stack_call_list={this.state.stack_call_list}
                />
            </>
        )
    }
}

export default StackCalls;