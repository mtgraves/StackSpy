import React from 'react';
import { PageHeader, Row, Col } from 'antd';
import StackCallTable from './StackCallTable';
import StackCallDisplay from './StackCallDisplay';

class StackCalls extends React.Component {

    state = {
        stack_call_2_display: undefined,
    }

    setCallToView = (rec) => {
        this.setState({
            stack_call_2_display: rec,
        })
    }

    render() {
        return (
            <>
                <PageHeader
                    title='Stack Call Inspector'
                    subTitle='Look at all the things that you did'
                >
                </PageHeader>
                <Row>
                    <Col span={8}>
                        <StackCallTable
                            stack_call_list={this.props.stack_call_list}
                            setCallToView={this.setCallToView}
                        />
                    </Col>
                    <Col span={16}>
                        <StackCallDisplay
                            stack_call_2_display={this.state.stack_call_2_display}
                        />
                    </Col>
                </Row>
            </>
        )
    }
}

export default StackCalls;