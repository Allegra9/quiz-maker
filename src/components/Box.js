import styled from 'styled-components'

export const Box = ({ answer, answerAudioUrl, answerImageUrl }) => {
  return (
    <Container id="main-box">
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
    </Container>
  )
}

const Container = styled.div`
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
