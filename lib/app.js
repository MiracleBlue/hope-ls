import Lucky from './Lucky';
import Im from 'seamless-immutable';
import { filesInDirectory } from './ls/utils/fileInfo';

const FileInfoRow = ({ name, fullPath, owner, size, permissions, lastModified }) => {
    return (
        <elem>
            This is a file info row {name}
        </elem>
    )
};

const App = () => {
    const styles = Im({
        text: {
            colour: 'blue',
            background: 'orange'
        }
    });

    return (
        <elem styles={styles}>
            <elem>
                <elem>
                    hello
                </elem>
            </elem>
            what is up
            <elem>
                friends
                <elem>
                    ?!
                </elem>
            </elem>
            <FileInfoRow name={'hey there'} />
            <FileInfoRow />
        </elem>
    );
}

function main() {
    console.log(Lucky.render(
        <App styles={Im({text:{colour:'green'}})} />
    ));
}

console.time('render');
main();
console.timeEnd('render');
