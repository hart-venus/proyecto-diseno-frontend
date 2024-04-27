function ControlButton({title}) {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded-md
            text-lg">
            {title}
        </button>
    )
}

export default ControlButton;