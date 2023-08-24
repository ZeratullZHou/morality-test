import { Table } from 'antd';
import rules from '../public/rules';

const columns = [
    {
        title: '类别',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
    },
    {
        title: '扣分',
        dataIndex: 'score',
        key: 'score',
        width: '14%',
    },
    {
        title: '说明',
        dataIndex: 'description',
        key: 'description',
        width: '44%',
    },
];
const { data } = rules;
const DocsPage = () => {
    return (
        <div>
            <Table
                expandable={{ defaultExpandAllRows: true }}
                columns={columns}
                dataSource={data}
                pagination={{
                    position: ['none', 'none'],
                }}
            />
        </div>
    );
};

export default DocsPage;
