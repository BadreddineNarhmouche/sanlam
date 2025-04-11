import { Worker, Viewer, Position, Tooltip, RotateDirection } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { rotatePlugin } from '@react-pdf-viewer/rotate';
import { SelectionMode, selectionModePlugin } from '@react-pdf-viewer/selection-mode';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';
import {
    buttonStyle,
    viewer
} from './styles';

export default function PDFViewer(props: any) {
    const getFilePluginInstance = getFilePlugin({
        fileNameGenerator: () => {
            return props.fileName;
        }
    });

    const { Download } = getFilePluginInstance;
    const rotatePluginInstance = rotatePlugin();
    const { Rotate } = rotatePluginInstance;
    const selectionModePluginInstance = selectionModePlugin();
    const { SwitchSelectionMode } = selectionModePluginInstance;

    const renderToolbar = (Toolbar: any) => (
        <div style={{
            // position: 'fixed',
            width: 'inherit',
            alignItems: 'center',
            display: 'flex',
            backgroundColor: '#F0F0F0',
        }}>
            <Toolbar>
                {(prop: any) => {
                    const {
                        EnterFullScreen,
                        Print,
                        ZoomIn,
                        ZoomOut,
                    } = prop
                    return (
                        <>
                            <div style={{ padding: "0px 2px", marginLeft: "20px" }}>
                                {props.fileName}
                            </div>
                            <div style={{ padding: '0px 2px', marginLeft: "auto" }}>
                                <Tooltip
                                    position={Position.BottomCenter}
                                    target={
                                        <SwitchSelectionMode mode={SelectionMode.Hand}>
                                            {(props: any) => (
                                                <button
                                                    style={buttonStyle}
                                                    onClick={props.onClick}>
                                                    <PanToolOutlinedIcon />
                                                </button>
                                            )}
                                        </SwitchSelectionMode>
                                    }
                                    content={() => <div>Hand tool</div>}
                                    offset={{ left: 0, top: 6 }} />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <Tooltip
                                    position={Position.BottomCenter}
                                    target={
                                        <SwitchSelectionMode mode={SelectionMode.Text}>
                                            {(props: any) => (
                                                <button
                                                    style={buttonStyle}
                                                    onClick={props.onClick}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                        width="24" height="24"
                                                        viewBox="0 0 26 26">
                                                        <path d="M 7 2.015625 L 20.160156 14.34375 L 14.785156 14.828125 L 13.808594 14.917969 L 14.214844 15.8125 L 17.476563 22.957031 L 15.070313 24.015625 L 11.957031 16.792969 L 11.566406 15.882813 L 10.84375 16.5625 L 7.027344 20.144531 L 7 2.015625 M 7 0.015625 C 6.730469 0.015625 6.460938 0.0664063 6.203125 0.179688 C 5.472656 0.496094 5 1.21875 5 2.015625 L 5.027344 20.144531 C 5.027344 20.941406 5.503906 21.660156 6.230469 21.976563 C 6.488281 22.085938 6.757813 22.140625 7.023438 22.140625 C 7.523438 22.140625 8.015625 21.953125 8.394531 21.601563 L 10.855469 19.289063 L 13.234375 24.804688 C 13.445313 25.296875 13.84375 25.679688 14.339844 25.875 C 14.574219 25.96875 14.820313 26.015625 15.070313 26.015625 C 15.34375 26.015625 15.617188 25.957031 15.875 25.84375 L 18.28125 24.785156 C 18.769531 24.570313 19.15625 24.167969 19.34375 23.667969 C 19.535156 23.167969 19.519531 22.613281 19.296875 22.125 L 16.796875 16.65625 L 20.339844 16.332031 C 21.125 16.261719 21.796875 15.738281 22.050781 14.992188 C 22.308594 14.246094 22.101563 13.421875 21.527344 12.882813 L 8.367188 0.554688 C 7.988281 0.199219 7.496094 0.015625 7 0.015625 Z"></path>
                                                    </svg>
                                                </button>
                                            )}
                                        </SwitchSelectionMode>
                                    }
                                    content={() => <div>Text selection tool</div>}
                                    offset={{ left: 0, top: 6 }} />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <Tooltip
                                    position={Position.BottomCenter}
                                    target={
                                        <Rotate direction={RotateDirection.Backward}>
                                            {(props: any) => (
                                                <button
                                                    style={buttonStyle}
                                                    onClick={props.onClick}>
                                                    <RotateLeftIcon />
                                                </button>
                                            )}
                                        </Rotate>
                                    }
                                    content={() => <div>Pivoter à gauche</div>}
                                    offset={{ left: 0, top: 6 }} />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <Tooltip
                                    position={Position.BottomCenter}
                                    target={
                                        <Rotate direction={RotateDirection.Forward}>
                                            {(props: any) => (
                                                <button
                                                    style={buttonStyle}
                                                    onClick={props.onClick}>
                                                    <RotateRightIcon />
                                                </button>
                                            )}
                                        </Rotate>
                                    }
                                    content={() => <div>Pivoter à droite</div>}
                                    offset={{ left: 0, top: 6 }} />
                            </div>
                            <div style={{ padding: "0px 2px" }}>
                                <Tooltip
                                    position={Position.BottomCenter}
                                    target={
                                        <ZoomOut>
                                            {(props: any) => (
                                                <button
                                                    style={buttonStyle}
                                                    onClick={props.onClick}>
                                                    <ZoomOutIcon />
                                                </button>
                                            )}
                                        </ZoomOut>
                                    }
                                    content={() => <div>Réduire</div>}
                                    offset={{ left: 0, top: 6 }} />
                            </div>
                            <div style={{ padding: "0px 2px" }}>
                                <Tooltip
                                    position={Position.BottomCenter}
                                    target={
                                        <ZoomIn>
                                            {(props: any) => (
                                                <button
                                                    style={buttonStyle}
                                                    onClick={props.onClick}>
                                                    <ZoomInIcon />
                                                </button>
                                            )}
                                        </ZoomIn>
                                    }
                                    content={() => <div>Agrandir</div>}
                                    offset={{ left: 0, top: 6 }} />
                            </div>
                            <div style={{ padding: "0px 2px" }}>
                                <Tooltip
                                    position={Position.BottomCenter}
                                    target={
                                        <EnterFullScreen>
                                            {(props: any) => (
                                                <button
                                                    style={buttonStyle}
                                                    onClick={props.onClick}>
                                                    <FullscreenIcon />
                                                </button>
                                            )}
                                        </EnterFullScreen>
                                    }
                                    content={() => <div>Plein écran</div>}
                                    offset={{ left: 0, top: 6 }} />
                            </div>

                            <div style={{ padding: "0px 2px" }}>
                                <Tooltip
                                    position={Position.BottomCenter}
                                    target={
                                        <Download>
                                            {(props: any) => (
                                                <button
                                                    style={buttonStyle}
                                                    onClick={props.onClick}>
                                                    <FileDownloadIcon />
                                                </button>
                                            )}
                                        </Download>
                                    }
                                    content={() => <div>Télécharger</div>}
                                    offset={{ left: 0, top: 6 }} />
                            </div>

                            <div style={{ padding: "0px 2px" }}>
                                <Tooltip
                                    position={Position.BottomCenter}
                                    target={
                                        <Print>
                                            {(props: any) => (
                                                <button
                                                    style={buttonStyle}
                                                    onClick={props.onClick}>
                                                    <PrintIcon />
                                                </button>
                                            )}
                                        </Print>
                                    }
                                    content={() => <div>Imprimer</div>}
                                    offset={{ left: 0, top: 6 }} />
                            </div>

                            {props.onClose && <div style={{ padding: "0px 2px", marginRight: "20px" }}>
                                <Tooltip
                                    position={Position.BottomCenter}
                                    target={
                                        <button style={buttonStyle} onClick={props.onClose}>
                                            <CloseIcon />
                                        </button>
                                    }
                                    content={() => <div>Fermer</div>}
                                    offset={{ left: 0, top: 6 }} />
                            </div>}

                        </>
                    );
                }}
            </Toolbar>
        </div>
    );

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: () => [],
        renderToolbar
    });

    const renderError = (error: any) => {
        let message = '';

        switch (error.name) {
            case 'MissingPDFException':
                message = "Erreur";

                break;

            case 'FormatError':
                message = "Erreur";

                break;

            case 'InvalidPDFException':
                message = "Erreur";

                break;

            case 'UnexpectedResponseException':
                message = "Erreur";

                break;

            default:
                message = 'Impossible de charger le document';

                break;
        }

        return (
            <div
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 2
                }}>
                <div style={{ paddingRight: "20px", float: 'right' }}>
                    <Tooltip
                        position={Position.BottomCenter}
                        target={
                            <button style={buttonStyle} onClick={props.onClose}>
                                <CloseIcon />
                            </button>
                        }
                        content={() => <div>Fermer</div>}
                        offset={{ left: 0, top: 6 }} />
                </div>

                <div
                    style={{
                        backgroundColor: "#E53E3E",
                        borderRadius: "0.25rem",
                        color: "#FFFFFF",
                        padding: "0.5rem",
                        width: 'fit-content',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                    {message}
                </div>
            </div>
        );
    };

    return (
        <div style={viewer}>
            <Worker workerUrl="/pdf.worker.min.js">
                <Viewer
                    fileUrl={props.file}
                    defaultScale={1}
                    renderError={renderError}
                    plugins={[defaultLayoutPluginInstance, getFilePluginInstance, rotatePluginInstance, selectionModePluginInstance]} />
            </Worker>
        </div>
    );
};