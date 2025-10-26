import ClipLoader from "react-spinners/ClipLoader";

const override =  {
    display: "block",
    borderColor: "hsl(var(--primary))",
  };

const SmallSpinner = () => {
  return (
    <ClipLoader
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default SmallSpinner
