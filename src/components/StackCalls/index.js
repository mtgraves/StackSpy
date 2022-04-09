import React from 'react';
import { PageHeader, Row, Col } from 'antd';
import StackCallTable from './StackCallTable';
import StackCallDisplay from './StackCallDisplay';

class StackCalls extends React.Component {

    state = {
        stack_call_2_display: undefined,
        // form/display collapse
        table_xs: 24,
        table_sm: 12,
        table_md: 8,
        table_lg: 8,
        table_xl: 6,
        plot_xs: 24,
        plot_sm: 12,
        plot_md: 16,
        plot_lg: 16,
        plot_xl: 18,
    }

    setCallToView = (rec) => {
        console.log(rec)
        this.setState({
            stack_call_2_display: rec,
        })
    }

    render() {
        console.log(this.props)
        return (
            <>
                <PageHeader
                    title='Stack Call Inspector'
                    subTitle='Look at all the things that you did'
                >
                </PageHeader>
                <Row gutter={16} type="flex">
                    <Col xs={this.state.table_xs} sm={this.state.table_sm} md={this.state.table_md} lg={this.state.table_md} xl={this.state.table_xl}>
                        <StackCallTable
                            stack_call_list={this.props.stack_call_list}
                            setCallToView={this.setCallToView}
                        />
                    </Col>
                    <Col xs={this.state.plot_xs} sm={this.state.plot_sm} md={this.state.plot_md} lg={this.state.plot_md} xl={this.state.plot_xl}>
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