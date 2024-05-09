/** @jsxImportSource frog/jsx */

require('dotenv').config();

import { Button, Frog, TextInput } from 'frog'
//import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'

const apiKeyNeynar = process.env.NEYNAR_API_KEY || '';
const signerUUID = process.env.SIGNER_UUID;

const apiKeyNeynar2 = process.env.NEYNAR_API_KEY2 || '';
const signerUUID2 = process.env.SIGNER_UUID2;

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
})

app.frame('/', async (c) => {
  const { status, inputText, frameData } = c;

  let fnameInput: any = '';
  let searcherName: any = '';
  let firstMessage = "testing concluded. thanks!";

  let power = 'false';

  if (power === 'true') {
    fnameInput = inputText ? String(inputText).toLowerCase().replace(/@/g, '') : '';
    
    let searchData: any = '';
    let castHashes: any = ''; 

    const options = {
      method: 'GET',
      headers: {accept: 'application/json', api_key: apiKeyNeynar}
    };
    
    await fetch(`https://api.neynar.com/v2/farcaster/user/search?q=${fnameInput}&limit=1`, options)
      .then(response => response.json())
      .then(response => {
      console.log(response);
      searchData = response.result.users[0];
      console.log(searchData);
      })
      .catch(err => console.error(err));

    if (searchData) {
      
      await fetch(`https://api.neynar.com/v2/farcaster/user/bulk?fids=${frameData!.fid}`, options)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          searcherName = response.users[0].username;
    })
        .catch(err => console.error(err));

      firstMessage = `@${searcherName} sent @${searchData.username} 10 likes`;

      await fetch(`https://api.neynar.com/v1/farcaster/casts?fid=${searchData.fid}&limit=10`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        castHashes = response.result.casts.map((cast: any) => cast.hash);
        console.log(castHashes);
    })
      .catch(err => console.error(err));


      const options2 = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          api_key: apiKeyNeynar,
          'content-type': 'application/json'
        },
        body: '' // We will set this inside the loop
    };
    
    // Loop through each hash in castHashes
    for (const hash of castHashes) {
        options2.body = JSON.stringify({
            reaction_type: 'like',
            target: hash,
            signer_uuid: signerUUID,
        });
    
        try {
            const response = await fetch('https://api.neynar.com/v2/farcaster/reaction', options2);
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        } catch (err) {
            console.error(err);
        }
    }

        const options3 = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            api_key: apiKeyNeynar,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            parent: frameData?.castId.hash,
            signer_uuid: signerUUID,
            text: firstMessage,
          })
        };
        
        fetch('https://api.neynar.com/v2/farcaster/cast', options3)
          .then(response => response.json())
          .then(response => console.log(response))
          .catch(err => console.error(err));

    } else {
      firstMessage = 'username not found';
    }

  };


  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'black',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          fontFamily: 'monospace',
        }}
      >

<div
          style={{
            color: 'white',
            fontSize: 36,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap'
          }}
        >
          {firstMessage}
        </div>
        
        <div
          style={{
            color: 'black',
            fontSize: 36,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            
            whiteSpace: 'pre-wrap',
            position: 'absolute',
            top: 0,
            left: 18,
            textAlign: 'left',
          }}
        >
          {fnameInput}
        </div>
        
      </div>
    ),
    intents: [
      <TextInput placeholder="enter a username..." />,
      <Button value="submit">submit</Button>,
      <Button.Reset>reset</Button.Reset>,
    ],
  })
})



export const GET = handle(app)
export const POST = handle(app)
