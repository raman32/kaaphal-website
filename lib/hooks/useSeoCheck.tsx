import { useCallback, useState } from 'react'

export function useSeoCheck(form) {
    const [seoProblems, setSeoProblems] = useState([
        { name: 'titleIncludesTargetWord', errorText: 'Title doesn\'t include the targeted word please add that on the tilte.', hasError: false },
        { name: 'HTMLtitleIncludesTargetWord', errorText: 'HTML Title doesn\'t include the targeted word please add that on the tilte.', hasError: false },
        { name: 'descriptionIncludesTargetWord', errorText: 'Meta Descriptions doesn\'t include the targeted word please add that on the tilte.', hasError: false },
        { name: 'keywordsIncludesTargetWord', errorText: 'Meta Keywords doesn\'t include the targeted word please add that on the tilte.', hasError: false },
        { name: 'firstParagraphIncludesTargetWord', errorText: 'First paragraph of the body doesn\'t include the targeted word please add that on the tilte.', hasError: false },
        { name: 'bodyIncludesTargetWordMoreThanTwoTimes', errorText: 'Bbody doesn\'t include the targeted word at least three times in the text.', hasError: false },
    ]);
    const checkOptimization = useCallback(() => {
        const targetWord = form.getFieldValue('targetWord') ?? ''
        const title = form.getFieldValue('title') ?? ''
        const slug = form.getFieldValue('slug') ?? ''
        const HTMLtitle = form.getFieldValue('HTMLTitle') ?? ''
        const metaDescription = form.getFieldValue('metas')?.find(meta => meta.name === 'description')?.content ?? ''
        const metaKeywords = form.getFieldValue('metas')?.find(meta => meta.name === 'keywords')?.content ?? ''
        const body = form.getFieldValue('body') ?? ''
        const firstParagraph = body.match(/^((?!<\/p>).)*/)[0]?.substring(3) ?? ''
        const bodyLength = body.replace(/<[^>]*>?/gm, '').length;

        setSeoProblems([
            { name: 'titleIncludesTargetWord', errorText: 'Title doesn\'t include the targeted word please add that on the tilte.', hasError: !title.includes(targetWord) },
            { name: 'HTMLtitleIncludesTargetWord', errorText: 'HTML Title doesn\'t include the targeted word please add that on the tilte.', hasError: !HTMLtitle.includes(targetWord) },
            { name: 'descriptionIncludesTargetWord', errorText: 'Meta Descriptions doesn\'t include the targeted word please add that on the tilte.', hasError: !metaDescription.includes(targetWord) },
            { name: 'keywordsIncludesTargetWord', errorText: 'Meta Keywords doesn\'t include the targeted word please add that on the tilte.', hasError: !metaKeywords.includes(targetWord) },
            { name: 'firstParagraphIncludesTargetWord', errorText: 'First paragraph of the body doesn\'t include the targeted word please add that on the tilte.', hasError: !firstParagraph.includes(targetWord) },
            { name: 'bodyIncludesTargetWordMoreThanTwoTimes', errorText: 'Body includes the keyphrase more than two times.', hasError: !(bodyLength < 600 && body.match(new RegExp(targetWord), 'g')?.length < 2) },
            { name: 'bodyIncludesTargetWordMoreThanThreeTimes', errorText: 'Body includes the keyphrase more than three times.', hasError: !(bodyLength > 600 && body.match(new RegExp(targetWord), 'g')?.length <= 2) },
            { name: 'slugIncludesFocusKeyPhrase', errorText: 'Slug doesn\'t includes the keyphrase', hasError: !(targetWord.trim().split(' ').some((targetWord_) => slug.includes(targetWord_))) },
            { name: 'HTMLTitleOverflowError', errorText: 'HTML title is too large', hasError: !(HTMLtitle.trim().split(' ').length < 12) },
            { name: 'metaDescriptionOverflowError', errorText: 'Meta Description is too large', hasError: !(metaDescription.trim().split(' ').length < 24) },
        ])
    }, [form])

    return { seoProblems, checkOptimization }
}