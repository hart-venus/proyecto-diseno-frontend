function ReturnButton({title, page}) {

    const handleButton = () => {
        window.location.href = page
    }

    return (
        <button onClick={handleButton}
            className="text-white w-48 mt-4 rounded-lg border-4 border-transparent font-bold p-1 bg-red-500 hover:bg-red-700">
            {title}
        </button>
    )
}

export default ReturnButton