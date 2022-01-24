import React from 'react'
import styled from 'styled-components'
import { WordAssoc } from './components/WordAssoc'

const catImageUrl =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/800px-Cat_November_2010-1a.jpg'

const App = () => {
  return (
    <Container>
      <WordAssoc answer="neko" answerImageUrl={catImageUrl} />
    </Container>
  )
}

export default App

const Container = styled.div`
  width: 90%;
  margin: 40px auto;

  @media (max-width: 750px) {
    width: 90%;
  }
`
