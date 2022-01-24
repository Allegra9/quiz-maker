import React from 'react'
import Draggable from 'react-draggable'
import * as googleTTS from 'google-tts-api'
// must have this in html head for audio tag to work:
// <meta name="referrer" content="no-referrer" />
import styled from 'styled-components'

export class WordAssoc extends React.Component {
  state = {
    activeElement: null,
    options: this.props.options,
    positions: [],
    deltaPosition: {
      x: 0,
      y: 0
    },
    boxDeltaPosition: {
      top: 0, // y
      bottom: 0,
      right: 0,
      left: 0 // x
    },
    answer: this.props.answer,
    answerAudioUrl: null,
    answerImageUrl: this.props.answerImageUrl
  }

  componentDidMount() {
    const answerAudioUrl = googleTTS.getAudioUrl(this.state.answer, {
      lang: 'ja-JP', // 'en'
      slow: false,
      host: 'https://translate.google.com'
    })
    if (answerAudioUrl)
      this.setState({
        answerAudioUrl
      })
    const box = document.getElementById('main-box')
    const rectBox = box.getBoundingClientRect()
    this.setState({
      boxDeltaPosition: {
        top: rectBox.top,
        bottom: rectBox.bottom,
        right: rectBox.right,
        left: rectBox.left
      }
    })
  }

  handleDrag = (e, idx) => {
    const { options, positions } = this.state
    this.setState({
      activeElement: options[idx],
      positions: {
        ...positions,
        [options[idx]]: {
          deltaPosition: {
            x: e.x,
            y: e.y
          }
        }
      }
    })
  }

  onDrop = idx => {
    const box = document.getElementById('main-box')
    const el = document.getElementById(`item${idx}`)
    const rect = el.getBoundingClientRect()
    // also need to consider element size: height and width if allow partial overlap
    // currently only allows full overlap
    const rectBox = this.state.boxDeltaPosition

    const yAxisOverlap = rect.top > rectBox.top && rect.bottom < rectBox.bottom
    if (yAxisOverlap) console.log('Y OVERLAP detected')

    const xAxisOverlap = rect.left > rectBox.left && rect.right < rectBox.right
    if (xAxisOverlap) console.log('X axis OVERLAP detected')

    const fullOverlap = yAxisOverlap && xAxisOverlap

    if (fullOverlap) {
      console.log('FULL OVERLAP')
      if (this.state.activeElement === this.state.answer) {
        const audio = document.querySelector('audio')
        audio.play()
        box.style.border = '5px solid green'
      } else box.style.border = '5px solid red'
    } else {
      box.style.border = '2px solid #000'
    }
  }

  render() {
    const { options, answer, answerAudioUrl, answerImageUrl } = this.state
    return (
      <>
        <h1>What is displayed in the picture?</h1>
        <p>Drag your answer to the box:</p>
        <Container>
          <ItemsContainer>
            {options.map((el, idx) => (
              <Draggable
                key={el}
                onStart={this.onStart}
                onDrag={e => this.handleDrag(e, idx)}
                onStop={() => this.onDrop(idx)}
                bounds="body"
              >
                <Item id={`item${idx}`} className="box item">
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                    {el}
                  </div>
                </Item>
              </Draggable>
            ))}
          </ItemsContainer>
          <Box id="main-box" className="box drop-target">
            <div style={{ marginBottom: '50px' }}></div>
            <div style={{ textAlign: 'center' }}>
              <Image src={answerImageUrl} alt={answer} />
              {answerAudioUrl && (
                <Figure>
                  <figcaption style={{ marginBottom: '10px' }}>
                    Answer audio:
                  </figcaption>
                  <audio
                    controls
                    type="audio/mpeg"
                    src={answerAudioUrl}
                    style={{ zIndex: 1, position: 'relative' }}
                  >
                    Your browser does not support the
                    <code>audio</code> element.
                  </audio>
                </Figure>
              )}
            </div>
          </Box>
        </Container>
        <SmallText>* Red border means your answer is incorrect.</SmallText>
        <SmallText>** Green border means your answer is correct.</SmallText>
      </>
    )
  }
}

const Container = styled.div`
  border-radius: 8px;
  padding: 20px;
  width: 70%;

  @media (max-width: 750px) {
    width: 100%;
    padding: 20px 0;
  }
`

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 750px) {
    display: block;
  }
`

const Item = styled.div`
  border: 1px solid #6b4580;
  width: 250px;
  border-radius: 8px;
  background: #faf5fa;
  z-index: 1000;
  position: relative;
  padding: 12px;
  margin: auto auto 10px;
  cursor: pointer;

  &:hover {
    background: #f0e4f0;
  }

  @media (max-width: 750px) {
    width: 80%;
  }
`

const Box = styled.div`
  width: 500px;
  height: 400px;
  border: 2px solid #6e6e6e;
  margin: auto;
  margin-top: 40px;
  border-radius: 8px;
  background: #fffff2;
  padding: 8px;

  @media (max-width: 750px) {
    width: 90%;
  }
`

const Image = styled.img`
  height: 200px;
  margin-bottom: 10px;
`

const Figure = styled.figure`
  @media (max-width: 750px) {
    margin: 0;
  }
`

const SmallText = styled.p`
  font-size: 0.9em;
  color: grey;
  margin: 5px;
`
