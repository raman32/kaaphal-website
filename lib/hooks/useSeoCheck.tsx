import { useCallback, useState } from 'react'

export function useSeoCheck(form) {
    const [seoProblems, setSeoProblems] = useState([
        { name: 'titleIncludesTargetWord', errorText: 'Title doesn\'t include the targeted word please add that on the tilte.', hasError: false },
        { name: 'HTMLtitleIncludesTargetWord', errorText: 'HTML Title doesn\'t include the targeted word please add that on the tilte.', hasError: false },
        { name: 'descriptionIncludesTargetWord', errorText: 'Meta Descriptions doesn\'t include the targeted word please add that on the tilte.', hasError: false },
        { name: 'keywordsIncludesTargetWord', errorText: 'Meta Keywords doesn\'t include the targeted word please add that on the tilte.', hasError: false },
        { name: 'firstParagraphIncludesTargetWord', errorText: 'First paragraph of the body doesn\'t include the targeted word please add that on the tilte.', hasError: false },
        { name: 'bodyIncludesTargetWordAtLeastThreeTime', errorText: 'Bbody doesn\'t include the targeted word at least three times in the text.', hasError: false },
    ]);
    const checkOptimization = useCallback(() => {
        const targetWord = form.getFieldValue('targetWord') ? form.getFieldValue('targetWord') : ''
        const title = form.getFieldValue('title') ? form.getFieldValue('title') : ''
        const HTMLtitle = form.getFieldValue('HTMLTitle') ? form.getFieldValue('HTMLTitle') : ''
        const metaDescription = form.getFieldValue('metas') ? form.getFieldValue('metas').find(meta => meta.name === 'description').content : ''
        const metaKeywords = form.getFieldValue('metas') ? form.getFieldValue('metas').find(meta => meta.name === 'keywords').content : ''
        const body = form.getFieldValue('body') ? form.getFieldValue('body') : ''
        const firstParagraph = body.match(/^((?!<\/p>).)*/)[0].substring(3)

        setSeoProblems([
            { name: 'titleIncludesTargetWord', errorText: 'Title doesn\'t include the targeted word please add that on the tilte.', hasError: !title.includes(targetWord) },
            { name: 'HTMLtitleIncludesTargetWord', errorText: 'HTML Title doesn\'t include the targeted word please add that on the tilte.', hasError: !HTMLtitle.includes(targetWord) },
            { name: 'descriptionIncludesTargetWord', errorText: 'Meta Descriptions doesn\'t include the targeted word please add that on the tilte.', hasError: !metaDescription.includes(targetWord) },
            { name: 'keywordsIncludesTargetWord', errorText: 'Meta Keywords doesn\'t include the targeted word please add that on the tilte.', hasError: !metaKeywords.includes(targetWord) },
            { name: 'firstParagraphIncludesTargetWord', errorText: 'First paragraph of the body doesn\'t include the targeted word please add that on the tilte.', hasError: !firstParagraph.includes(targetWord) },
            { name: 'bodyIncludesTargetWordAtLeastThreeTime', errorText: 'Body doesn\'t include the targeted word at least three times in the text.', hasError: !(body.match(new RegExp(targetWord), 'g') && body.match(new RegExp(targetWord, 'gm')).length > 2) },
        ])
    }, [form])

    return { seoProblems, checkOptimization }
}