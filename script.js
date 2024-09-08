import com.github.sarxos.webcam.Webcam;
import com.github.sarxos.webcam.WebcamException;

import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;

public class WebcamCaptureExample {

    private JFrame frame;
    private JLabel imageLabel;
    private Webcam webcam;

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new WebcamCaptureExample().createAndShowGUI());
    }

    public void createAndShowGUI() {
        frame = new JFrame("Webcam Capture Example");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(800, 600);
        frame.setLayout(new BorderLayout());

        // Initialize webcam
        try {
            webcam = Webcam.getDefault();
            if (webcam != null) {
                webcam.open();
            } else {
                JOptionPane.showMessageDialog(frame, "No webcam detected", "Error", JOptionPane.ERROR_MESSAGE);
                return;
            }
        } catch (WebcamException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(frame, "Failed to open webcam", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }

        // Create and add components
        imageLabel = new JLabel();
        frame.add(imageLabel, BorderLayout.CENTER);

        // Capture image
        captureAndShowImage();

        // Display the frame
        frame.setVisible(true);
    }

    private void captureAndShowImage() {
        // Capture the image from the webcam
        BufferedImage image = webcam.getImage();
        if (image != null) {
            ImageIcon icon = new ImageIcon(image);
            imageLabel.setIcon(icon);
        } else {
            JOptionPane.showMessageDialog(frame, "Failed to capture image", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}
