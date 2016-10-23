import Lucky from './Lucky';
import Im from 'seamless-immutable';
import { filesInDirectory } from './ls/utils/fileInfo';

const FileInfoRow = ({ name, fullPath, owner, size, permissions, lastModified }) => {
    return (
        <elem>
            File info: {name} {size} {owner} {permissions} {lastModified}
        </elem>
    )
};

const App = ({ store }) => {
    const styles = Im({
        text: {
            colour: 'blue',
            background: 'orange'
        }
    });

    const fileInfo = store.map(item => (
        <FileInfoRow {...item} />
    ));

    //console.log(fileInfo);

    return (
        <elem styles={styles}>
            File info should follow
            {fileInfo}
        </elem>
    );
}

async function main() {
    console.time('render');
    const store = await filesInDirectory(process.cwd());
    console.log(Lucky.render(
        <App store={store} styles={Im({text:{colour:'green'}})} />
    ));
    console.timeEnd('render');
}

main();

if (typeof window !== "undefined") window.main = main;
