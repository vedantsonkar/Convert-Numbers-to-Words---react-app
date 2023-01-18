import React, { useState } from 'react';
import './App.css';
import { Form, Select, Button, Input } from 'antd';
const { TextArea } = Input;




function App() {

  const onesArr = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teensArr = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tensArr = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  let responseData = [];
  const [response, setResponse] = useState("");

  async function convert(arr) {
    for (var i = 0; i < arr.length; i++) {
      var string = await INR(arr[i]);
      responseData.push(`${i + 1}) ${arr[i]} - ${string}`);
    }
    setResponse(responseData.toString());
  }

  function INR(input) {

    var a, b, c, d, e, output;

    a = Number(String(input)[0])
    b = Number(String(input)[1])
    c = Number(String(input)[2])
    d = Number(String(input)[3])
    e = Number(String(input)[4])

    //a is the first digit of number and e is the last digit

    if (input === "") {
      output = "";
    }

    if (typeof input !== "number") {
      output = "Not a number";
    }

    if (input === 0) { // Zero  
      output = "Zero";
    } else { // More than one

      // Units
      if (input > 0 && input < 10) {
        output = onesArr[input];
      }

      // Tens
      if (input > 9 && input < 100) {
        output = getTens(input, a, b)
      }

      // Hundreds
      if (input > 99 && input < 1000) {
        output = getHundreds(input, a, b, c)
      }

      // Thousands
      if (input > 999 && input < 10000) {
        output = getThousands(input, a, b, c, d)
      }

      // Ten Thousand
      if (input > 9999 && input < 100000) {
        output = getTenThousands(input, a, b, c, d, e);
      }

      //Above Ten Thousand
      if (input > 99999) {
        output = "Number out of range please enter between 1 - 99999"
      }

    }
    return output;
  }


  function getTens(input, a, b) {
    // Tens
    let output;
    if (input < 20) {
      //teens
      output = `${teensArr[b]}`
    }
    else if (input > 20 && b === 0) {
      //Others
      output = `${tensArr[b]}`
    } else {
      output = `${tensArr[a]} ${onesArr[b]}`
    }
    return output;
  }

  function getHundreds(input, a, b, c) {
    let output;
    if (a === 0) {
      output = `${getTens(input, b, c)}`
    } else if (b === 0 && c === 0) {
      output = `${onesArr[a]} Hundred`
    } else {
      output = `${onesArr[a]} Hundred and ${getTens(input, b, c)}`
    }
    return output;
  }

  function getThousands(input, a, b, c, d) {
    let output;
    if (a === 0) {
      output = `${getHundreds(input, b, c, d)}`
    } else if (b === 0 && c === 0 && d === 0) {
      output = `${onesArr[a]} Thousand`
    } else {
      output = `${onesArr[a]} Thousand and ${getHundreds(input, b, c, d)}`
    }
    return output;
  }

  function getTenThousands(input, a, b, c, d, e) {
    let output;
    const tempInput = Number(`${a}${b}`)
    if (a === 0) {
      output = `${getThousands(input, b, c, d, e)}`
    } else {
      if (tempInput < 20) {
        if (c === 0 && d === 0 && e === 0) {
          output = `${teensArr[b]} Thousand`
        } else {
          output = `${teensArr[b]} Thousand and ${getHundreds(input, c, d, e)}`
        }
      } else if (tempInput > 20 && b === 0 && c === 0 && d === 0 && e === 0) {
        output = `${tensArr[a]} Thousand`
      } else {
        output = `${tensArr[a]} ${onesArr[b]} Thousand and ${getHundreds(input, c, d, e)}`
      }
    }
    return output
  }

  let options = [];
  const handleChange = (value) => {
    options = value
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Convert Numbers to Words
        </h2>
        <Form
          name="numberToWords"
          autoComplete="off"
        >
          <Form.Item label="Enter Numbers" name="numbers">
            <Select
              mode="tags"
              placeholder="Enter Multiple Numbers"
              onChange={(value) => { handleChange(value); }}
              style={{ width: "250px" }}
            />
          </Form.Item>
        </Form>
        <Button onClick={() => { convert(options); }}>
          Convert
        </Button>
        <TextArea
          style={{ height: 120, width: 500, margin: 24, cursor: "not-allowed" }}
          readOnly
          value={response}
        />
      </header>
    </div>
  );
}

export default App;
