import com.github.sarxos.webcam.Webcam;
import com.github.sarxos.webcam.WebcamException;

import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;

public class WebcamCaptureBar {

    private JFrame frame;
    private JLabel captureBarLabel;
    private Webcam webcam;
    private Timer timer;

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new WebcamCaptureBar().createAndShowGUI());
    }

    public void createAndShowGUI() {
        frame = new JFrame("Webcam Capture Bar");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(800, 200);
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

        // Create capture bar
        JPanel captureBar = new JPanel();
        captureBar.setPreferredSize(new Dimension(frame.getWidth(), 200));
        captureBar.setLayout(new BorderLayout());
        captureBar.setBackground(Color.BLACK);
        
        captureBarLabel = new JLabel();
        captureBarLabel.setPreferredSize(new Dimension(frame.getWidth(), 200));
        captureBarLabel.setHorizontalAlignment(JLabel.CENTER);
        captureBarLabel.setVerticalAlignment(JLabel.CENTER);
        captureBarLabel.setOpaque(true);
        captureBarLabel.setBackground(Color.BLACK);
        
        captureBar.add(captureBarLabel, BorderLayout.CENTER);
        
        // Add capture bar to frame
        frame.add(captureBar, BorderLayout.NORTH);

        // Timer to update image from webcam
        timer = new Timer(30, e -> updateCaptureBar());
        timer.start();

        // Display the frame
        frame.setVisible(true);
    }

    private void updateCaptureBar() {
        if (webcam != null) {
            BufferedImage image = webcam.getImage();
            if (image != null) {
                ImageIcon icon = new ImageIcon(image.getScaledInstance(captureBarLabel.getWidth(), captureBarLabel.getHeight(), Image.SCALE_SMOOTH));
                captureBarLabel.setIcon(icon);
            }
        }
    }
}
