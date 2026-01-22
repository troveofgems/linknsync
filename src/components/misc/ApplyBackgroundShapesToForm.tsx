function ApplyBackgroundShapesToForm({ formType = "login" }) {
    return (
        <div className={`background ${formType}_styles`}>
            <div className={`shape ${formType}_shape_style`}></div>
            <div className={`shape ${formType}_shape_style`}></div>
        </div>
    );
}

export default ApplyBackgroundShapesToForm;