import { useEffect, useState } from 'react'
import Sentiment from 'sentiment'
import TextField from '@mui/material/TextField';
import ReactSpeedometer from "react-d3-speedometer"
import data from '../assets/tagalogWords.json'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TypeAnimation } from 'react-type-animation';

export const Hero = () => {
    const [inputText, setInputText] = useState()
    const [language, setLanguage] = useState('')
    const [typeError, setTypeError] = useState(false)
    const [result, setResult] = useState({ calculation: "", score: 0, positive: [], negative: [], tokens: [] })
    useEffect(() => {
        if (language == '') {
            setTypeError(true)
            setTimeout(() => {
                setTypeError(false)
            }, 1000)
        }
        const sentiment = new Sentiment()
        var tlLanguage = data
        sentiment.registerLanguage('tl', tlLanguage)
        const tagalogResult = sentiment.analyze(inputText, { language: 'tl' })
        const englishResult = sentiment.analyze(inputText, { language: 'en' })
        if (language == "tl") {
            setResult(tagalogResult)
            console.log(tagalogResult)
        } else if (language == "en") {
            setResult(englishResult)
        }

    }, [inputText])

    return (
        <div className="hero flex sm:py-14 py-20 sm:px-20 mt-10 sm:mt-18" id='home'>
            <div className="section1 sm:w-1/2 w-full flex flex-col gap-5 px-6 sm:py-10 justify-center">
                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Sentimental Analysis',
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        'Enter your feedback',
                        1000,
                        'Analyze your feelings',
                        1000
                    ]}
                    wrapper="span"
                    speed={50}
                    className='text-3xl font-semibold'
                    style={{ fontSize: '2rem', display: 'inline-block' }}
                    repeat={Infinity}
                />
                {typeError && <p className='font-semibold text-xl'>Pick a Language</p>}

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Language</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={(event) => setLanguage(event.target.value)}
                            label="Language"
                        >
                            <MenuItem value={"en"}>English</MenuItem>
                            <MenuItem value={"tl"}>Tagalog</MenuItem>
                        </Select>
                    </FormControl>

                </Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <TextField id="standard-basic" onChange={(e) => { setInputText(e.currentTarget.value) }}
                            label="Enter your statement" variant="standard" />
                        {typeError && <p className='text-red-500 mt-5'>Please select a language first!</p>}

                    </FormControl>

                </Box>

                {result && (
                    <div className='flex flex-col gap-10 justify-between py-5 sm:py-10 sm:px-10 px-5 border shadow-1xl rounded-lg'>
                        <p className='text-right sm:px-10 font-semibold text-md'>Analysis Result</p>
                        <div className="result1 flex flex-col gap-10 pr-5 w-full">
                            <p className=' font-medium'>Emotion Status                         {result.score === 0 ? <label >😐</label> : result.score < 0 && result.score >= -3 ? <label>☹️</label> :
                                result.score < -3 ? <label>😭</label> : result.score > 0 && result.score <= 3 ? <label>😊</label> : <label>🥰</label>}</p>
                            <p className='font-medium'>Words: {result.tokens ?
                                result.tokens.map((e, i) => {
                                    if (i == result.tokens.length - 1) {
                                        return (
                                            <label key={i}>{e} </label>)
                                    } else {
                                        return (
                                            <label key={i}>{e}, </label>)
                                    }

                                }) : null}</p>
                        </div>

                        <div className="result2  flex flex-col gap-10 w-full">
                            <p className='font-medium'>Negative Words: {result.negative ?
                                result.negative.map((e, i) => {
                                    if (i == result.negative.length - 1) {
                                        return (
                                            <label key={i}>{e} </label>)
                                    }
                                    return (
                                        <label key={i}>{e}, </label>)
                                }) : null}</p>
                            <p className='font-medium'>Positive Words: {result.positive ?
                                result.positive.map((e, i) => {
                                    if (i == result.positive.length - 1) {
                                        return (
                                            <label key={i}>{e} </label>)
                                    }
                                    return (
                                        <label key={i}>{e}, </label>)
                                }) : null}</p>
                        </div>




                    </div>
                )}
            </div>
            <div className="section2 sm:w-1/2 hidden p-5 sm:flex flex-col gap-2 justify-center items-center shadow-md border rounded-2xl">
                <h1 className='font-semibold text-3xl'>Emotion Meter</h1>
                {result && (
                    <>
                        {result.score === 0 ?
                            <p className='text-[8rem]'>😐</p> : result.score < 0 && result.score >= -3 ?
                                <p className='text-[8rem]'>☹️</p> :
                                result.score < -3 ?
                                    <p className='text-[8rem]'>😭</p> : result.score > 0 && result.score <= 3 ?
                                        <p className='text-[8rem]'>😊</p> :
                                        <p className='text-[8rem]'>🥰</p>}
                    </>
                )}
                <div className=''>
                    <ReactSpeedometer
                        width={500}
                        needleHeightRatio={0.7}
                        value={result.score}
                        minValue={-10}
                        maxValue={10}
                        customSegmentStops={[-10, -5, 0, 5, 10]}
                        currentValueText="Happiness Level"
                        customSegmentLabels={[
                            {
                                text: 'Very Bad',
                                position: 'INSIDE',
                                color: '#555',
                            },
                            {
                                text: 'Bad',
                                position: 'INSIDE',
                                color: '#555',
                            },
                            {
                                text: 'Good',
                                position: 'INSIDE',
                                color: '#555',
                            },
                            {
                                text: 'Very Good',
                                position: 'INSIDE',
                                color: '#555',
                            },
                        ]}
                        ringWidth={47}
                        needleTransitionDuration={3333}
                        needleTransition="easeElastic"
                        needleColor={'#3b3c36 '}
                        textColor={'#3b3c36'}
                    />
                </div>

            </div>
        </div>
    )
}