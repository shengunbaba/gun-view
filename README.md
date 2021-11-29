## usage
- Directly copy the required components into the project


## react Common hook 
- useDragAble
  - Drag target element
- useOutsideClick
  - Click outside the target element（e.g.Click outside the target element to hide the target element）


## Why write this
- ant-design is a set of UI solutions for writing background management system. However, when writing non system websites, the UI styles that need to be displayed vary greatly
- f only one antd component needs to be referenced, a large number of configuration files will be introduced at the same time. CSS styles need to be covered in many places, resulting in a large amount of redundant code
- CSS is completely customized according to the project (except for the necessary CSS in the library, such as dynamic effect and typesetting), and there is no redundant code
- All components have external interfaces, similar to antd


## react ui component
- Select 
  - support search
```jsx harmony
const Demo = () => {

    const onChange = (val, e) => {
        console.log(val, e)
    }
    return (
        <Select
            value='1'
            showSearch={true}
            onChange={onChange}>
            <Option value='1'>1select option 1</Option>
            <Option value='2'>2select option 2</Option>
        </Select>
    )
}
```
&nbsp;

- Checkbox
```jsx harmony
const Demo = () => {

    const [check] = React.useState(true)
    const onChange = (status, id, e) => {
        console.log(status, id, e)
    }

    return (
        <div>
            <Checkbox onChange={onChange} checked={check} id='uuid'>Checkbox</Checkbox>
            <br/>
            <Checkbox halfcheck={true} onChange={onChange}>Checkbox</Checkbox>
            <br/>
            <Checkbox disabled={true} checked={true} onChange={onChange}>disable</Checkbox>
            <br/>
            <Checkbox disabled={true} checked={false} onChange={onChange}>disable</Checkbox>
        </div>

    )
}
```

&nbsp;


- VirtualTree
  - Support virtual scrolling
```jsx harmony
const Demo = () => {

    const [data] = React.useState<any[]>(treeData)
    const [expendKeys, setExpendKeys] = React.useState<string[]>(['root'])
  
    const [checkedKeys, setCheckedKeys] = React.useState<string[]>([])

    const onExpend = (expendKeys, current, e) => {
        console.log(expendKeys, current);
        setExpendKeys(expendKeys)
    }

    const onCheck = (checkedKeys, current, e) => {
        console.log(checkedKeys, current);
        setCheckedKeys(checkedKeys)
    }

    return (
        <VirtualTree
            data={data}
            expendKeys={expendKeys}
            checkedKeys={checkedKeys}
            onCheck={onCheck}
            onExpend={onExpend}
            height={260}
        />
    )
}
```

&nbsp;

 
- Modal
  - Support drag 
  
```jsx harmony
const Demo = () => {
    const [show, setShow] = React.useState(false)

    const onRight = (e) => {
    }

    const onCancel = (e) => {
        setShow(false)
    }

    const onLeft = (e) => {
        setShow(false)
    }

    const onShow = () => {
        setShow(true)
    }
    return (

        <div>
            <h5>Modal</h5>
            <br/> <br/>
            <button onClick={onShow}>modal-click</button>
            {
                show &&
                <Modal
                    dragAble={true}
                    title='title'
                    onRight={onRight}
                    right='Comfirm'
                    onCancel={onCancel}
                    onLeft={onLeft}
                    left='Cancel'
                >
                    <div>line line</div>
                    <div>line line line lineline line</div>
                    <div>....</div>
                </Modal>
            }

        </div>


    )
}
```

&nbsp;


- Clipboard

```jsx harmony
const Demo = () => {

    const [count, setCount] = React.useState(0)
    const onChange = (e) => {
        console.log(e)
        setCount(count + 1)
    }
    return (
        <Clipboard copy={'点击我复制到剪贴板'} onChange={onChange}>
            <div>
                <div className='demo-clipboard'>点击我复制到剪贴板</div>
                <div>{`已复制${count}次，ctrl + v 粘贴`}</div>
            </div>
        </Clipboard>

    )
}
```

&nbsp;

- ExCoArrow  (Shrink expanded arrow)
```jsx harmony
const Demo = () => {
    const [downward, setDownward] = React.useState(false)
    const onchange = (e) => {
        console.log(e)
        setDownward(!downward)
    }
    return (
        <ExCoArrow onChange={onchange} color='red' downward={downward}/>
    )
}
```

&nbsp;

- Tooltip
```jsx harmony
const Demo = () => {

    const [content, setContent] = React.useState <string>('tooltip')

    const onContentChange = () => {
        setContent(content.split('').reverse().join(''))
    }
    return (
        <>
            <Tooltip content={content} placement='top' destory={true}>
                <div className='demo' onClick={onContentChange}>
                    <span>tooltip-top</span>
                </div>
            </Tooltip>
            <Tooltip content={content} placement='bottom'>
                <div className='demo' onClick={onContentChange}>
                    <span>tooltip-bottom</span>
                </div>
            </Tooltip>
            <Tooltip content={content} placement='left'>
                <div className='demo' onClick={onContentChange}>
                    <span>tooltip-left</span>
                </div>
            </Tooltip>
            <Tooltip content={content} placement='right'>
                <div className='demo' onClick={onContentChange}>
                    <span>tooltip-right</span>
                </div>
            </Tooltip>
        </>

    )
}
```

&nbsp;

- Button
  - support loading
  
```jsx harmony
const Demo = () => {
    const [loading, setLoading] = React.useState(false)

    const onclickChange = (e) => {
        console.log(e)
        setLoading(!loading)
    }

    return (
        <div>
            <h5>button</h5>
            <br/> <br/>
            <Button onClick={onclickChange} loading={loading} className='demo-button'>click</Button>
        </div>
    )
}
```

&nbsp;

- Message  
  - success
  - warn
  - error
  
```jsx harmony
const Demo = () => {


    const onSuccess = () => {
        new Message('afa').success()
    }

    const onWarn = () => {
        new Message('afa').warn()
    }

    const onError = () => {
        new Message('afa').error()
    }
    return (
        <div className='message'>
            <h5>Message</h5>
            <span onClick={onSuccess}>success</span>
            <br/> <br/>
            <span onClick={onWarn}>warn</span>
            <br/> <br/>
            <span onClick={onError}>error</span>
        </div>

    )
}
```

&nbsp;


- Radio
```jsx harmony
const Demo = () => {

    const [check] = React.useState(false)
    const onChange = (status, id, e) => {
        console.log(status, id, e)
    }

    return (
        <Radio checked={check} onChange={onChange} id='uuid'>Radio</Radio>

    )
}
```

&nbsp;

- Icon
```jsx harmony
const Demo = () => {

    return (
        <div>
            <h5>icon</h5>
            <br/> <br/>
            <Icon type='audio'/>
        </div>

    )
}
```

&nbsp;

- Notification
```jsx harmony
   const Demo = () => {
   
       /**
        * duration = 0 ,  It won't close automatically
        */
       const onSuccess = () => {
           new Notification({
               title: 'successsuccesssuccesssuccesssuccesssuccesssuccess',
               describe: 'successsuccesssuccesssuccesssuccesssuccesssuccess'
           }, 0).success()
       }
   
       const onWarn = () => {
           new Notification({
               title: 'warn',
               describe: 'warnwarnwarnwarnwarnwarnwarnwarnwarnwarnwarnwarnwarn'
           }).warn()
       }
   
       const onError = () => {
           new Notification({
               title: 'error',
               describe: 'errorerrorerrorerrorerrorerrorerrorerrorerrorerror'
           }).error()
       }
   
       const onOpen = () => {
           new Notification({
               title: 'open',
               describe: 'openopenopenopenopenopenopenopenopenopenopenopenopen'
           }).open()
       }
   
       return (
           <div className='message'>
               <h5>Notification</h5>
               <span onClick={onOpen}>open</span>
               <br/> <br/>
               <span onClick={onSuccess}>success</span>
               <br/> <br/>
               <span onClick={onWarn}>warn</span>
               <br/> <br/>
               <span onClick={onError}>error</span>
           </div>
   
       )
   } 
```

&nbsp;

- Speaker  ( speaker icon)
  - Play flash
```jsx harmony
const Demo = () => {
    return (
        <Speaker leval={3}/>
    )
}
```

&nbsp;


- Grid
  - xs, sm, md, lg, xl 
  - span

```jsx harmony
const GridDemo = () => {
    return (
        <>
            <Row justify='between'>
                <Col span={6}>grid-6</Col>
                <Col span={6}>grid-6</Col>
                <Col span={6}>grid-6</Col>
            </Row>

            <Row justify='between' gutter={8}>
                <Col span={14}>grid-6</Col>
                <Col span={6}>grid-6</Col>
                <Col span={6}>grid-6</Col>
            </Row>

            <Row justify='between'>
                <Col md={6}>grid-6</Col>
                <Col md={6}>grid-6</Col>
                <Col md={6}>grid-6</Col>
            </Row>
        </>

    )
}
```

&nbsp;


- carousel ( Rotation  banner)
```jsx harmony
const Demo = () => {
    return (
        <Carousel className='carousel-demo' mouseEnterStopRoll={true}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
        </Carousel>
    )
}
```



