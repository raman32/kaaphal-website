import { Divider, Modal, Spin } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { LoksewaQuestion, useGetMockSetQuery } from '../../../../gql';
import { clientForStaticRendering } from '../../../../lib/apollo';
import { DollorIcon } from '../../../../lib/components/Icons/Index';
import { Question } from '../../../../lib/components/Question/Index';
import { defualtLayout } from '../../../layouts/default';

const MockSet = (): JSX.Element => {
    const router = useRouter();
    console.log(router.query);
    const { data } = useGetMockSetQuery({ variables: { setId: router.query.setId as string } })
    const [visible, setVisible] = useState(true);
    if (!data) return <div className="flex flex-col h-full justify-center items-center"> <Spin /> Loading </div>
    return (
        <div className="w-full px-4 sm:px-8 " role="application">
            <Modal
                title="Modal 1000px width"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
            <div className="flex flex-row justify-between my-4 items-center">
                <div className="text-base">
                    <div>
                        Full Marks : {data.getMockSet.questions.reduce((total, question) => total + question.weight, 0)}
                    </div>
                    <div>
                        Negative Marking : {data.getMockSet.category.negativeMarkingRatio} %
                    </div>
                </div>
                <h3 className="text-base text-center" dangerouslySetInnerHTML={{ __html: data.getMockSet.category.titleNP }}></h3>
                <Countdown title="Time remaining" value={Date.now() + 60 * 1000 * data.getMockSet.category.totalMins} onFinish={() => { }} className="text-right " />
            </div>
            <Divider />
            {data && data.getMockSet.questions.map((question, index) => <Question key={index} {...question.question as LoksewaQuestion} questionNumber={question.order} />)}
        </div>)
}

MockSet.getLayout = defualtLayout

export default MockSet