export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm text-purple-400 ' + className}>
            {message}
        </p>
    ) : null;
}
