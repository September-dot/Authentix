// Authentix Mock Detection Results Dataset
// Strict adherence to forensic categories for Image, Video, and Document modalities.

export const IMAGE_RESULTS = {
  low: {
    id: 'low',
    modality: 'image',
    modalityLabel: 'Image',
    tier: 'Low Risk',
    tierLabel: 'Low Risk of AI Generation',
    confidence: 94,
    status: 'low',
    badgeVariant: 'low',
    summary: 'Analyzed image displays uniform sensor noise profiles, consistent 8x8 DCT compression grids, and natural anatomical rendering characteristic of authentic optical camera capture.',
    evidence: [
      {
        id: 'img-ev-1',
        title: 'Frequency Spectrum Analysis (2D-FFT)',
        finding: 'Normal Fourier energy distribution across high frequencies',
        detail: 'No checkerboard or periodic grid energy spikes typical of generative upsampling or transposed convolution kernels were detected.',
        status: 'pass',
        statusLabel: 'Natural Spectrum'
      },
      {
        id: 'img-ev-2',
        title: 'Sensor Noise & PRNU Consistency',
        finding: 'Homogeneous photo-response non-uniformity',
        detail: 'Natural camera sensor silicon noise residuals are continuous across both foreground subject and background environment.',
        status: 'pass',
        statusLabel: 'Coherent PRNU'
      },
      {
        id: 'img-ev-3',
        title: 'Corneal & Optical Lighting Physics',
        finding: 'Physically plausible corneal reflection vectors',
        detail: 'Specular eye reflections, ear cartilage curvature, and fine hair strand blending conform to real-world optical lighting constraints.',
        status: 'pass',
        statusLabel: 'Plausible Physics'
      },
      {
        id: 'img-ev-4',
        title: 'Metadata & DCT Block Alignment',
        finding: 'Standard 8x8 DCT quantization grid intact',
        detail: 'Discrete cosine transform block boundaries show no secondary re-compression misalignments or synthetic stitching seams.',
        status: 'pass',
        statusLabel: 'Grid Intact'
      }
    ],
    limitations: [
      'A Low Risk score indicates the absence of common generative model artifacts, but does not certify legal authenticity or unbroken chain of custody.',
      'Advanced generative models post-processed with simulated sensor grain or optical blurring may reduce detectable artifacts.',
      'Authentix is a risk evaluation tool to assist human decision-making, not a legal guarantee of media origin.'
    ],
    nextActions: [
      'No immediate synthetic manipulation indicators detected.',
      'If validating critical security assets, verify cryptographic provenance (e.g. C2PA metadata) if available.',
      'Archive this analysis summary with timestamp for auditing records.'
    ]
  },

  medium: {
    id: 'medium',
    modality: 'image',
    modalityLabel: 'Image',
    tier: 'Medium Risk',
    tierLabel: 'Suspicious / Mixed Indicators Detected',
    confidence: 76,
    status: 'medium',
    badgeVariant: 'medium',
    summary: 'Localized spatial anomalies and frequency inconsistencies detected. While generative signatures are present, signals indicate possible hybrid editing, heavy retouching, or partial inpainting.',
    evidence: [
      {
        id: 'img-ev-1',
        title: 'Frequency Spectrum Analysis (2D-FFT)',
        finding: 'Localized high-frequency spikes in subject region',
        detail: 'Facial boundaries display frequency energy spikes inconsistent with the soft depth-of-field blur in the background plate.',
        status: 'warning',
        statusLabel: 'Spectral Mismatch'
      },
      {
        id: 'img-ev-2',
        title: 'Boundary & Hair Edge Coherence',
        finding: 'Unnatural texture blending on fine edges',
        detail: 'Micro-blurring and chromatic bleeding detected around hair-to-background transitional zones, common in diffusion masking.',
        status: 'warning',
        statusLabel: 'Masking Artifacts'
      },
      {
        id: 'img-ev-3',
        title: 'Reflection & Lighting Vectors',
        finding: '14° lighting vector divergence in specular reflections',
        detail: 'Corneal highlight orientation in the left pupil diverges from primary ambient shadow angles cast on the collar.',
        status: 'warning',
        statusLabel: 'Angular Inconsistency'
      },
      {
        id: 'img-ev-4',
        title: 'Noise Residual Variance',
        finding: 'Discontinuous noise variance across regions',
        detail: 'Residual noise variance drops significantly inside the central subject bounding box compared to perimeter pixels.',
        status: 'warning',
        statusLabel: 'Discontinuous Noise'
      }
    ],
    limitations: [
      'Aggressive smartphone portrait filters, heavy social media compression, or manual Photoshop retouching can mimic generative artifacts.',
      'A Medium Risk rating requires contextual evaluation and cannot be used as sole grounds for dismissing content.',
      'Different generative architectures leave distinct artifact profiles; hybrid images may mask one technique while exposing another.'
    ],
    nextActions: [
      'Request the original uncompressed source file or camera RAW from the content provider.',
      'Perform a reverse-image search to identify the earliest online publication and verify contextual origin.',
      'Conduct human editorial or forensic review focusing on anatomical edge transitions and lighting angles.'
    ]
  },

  uncertain: {
    id: 'uncertain',
    modality: 'image',
    modalityLabel: 'Image',
    tier: 'Uncertain',
    tierLabel: 'Inconclusive / Insufficient Signal Fidelity',
    confidence: 51,
    status: 'uncertain',
    badgeVariant: 'uncertain',
    summary: 'Detection signals are inconclusive. The uploaded image suffers from heavy compression or limited resolution that severely degrades latent forensic signatures.',
    evidence: [
      {
        id: 'img-ev-1',
        title: 'Signal-to-Noise Ratio (Degraded)',
        finding: 'Heavy lossy compression (estimated JPEG quality < 60)',
        detail: 'High-frequency forensic information was eradicated by aggressive quantization, making latent diffusion detection unreliable.',
        status: 'inconclusive',
        statusLabel: 'Signal Obfuscated'
      },
      {
        id: 'img-ev-2',
        title: 'Resolution Threshold Assessment',
        finding: 'Spatial dimensions approach minimal feature threshold',
        detail: 'At low resolution, deep neural feature maps lack sufficient pixel density to distinguish between real camera bokeh and diffusion blurring.',
        status: 'inconclusive',
        statusLabel: 'Sub-optimal Resolution'
      },
      {
        id: 'img-ev-3',
        title: 'Cross-Model Signature Alignment',
        finding: 'Conflicting likelihood scores across extractors',
        detail: 'Spatial CNN detectors reported 38% synthetic probability while spectral Fourier analysis reported 64%, yielding an inconclusive hybrid index.',
        status: 'inconclusive',
        statusLabel: 'Model Disagreement'
      },
      {
        id: 'img-ev-4',
        title: 'Provenance & EXIF Metadata',
        finding: 'All original capture headers stripped',
        detail: 'Image lacks color space profiles, camera model tags, and capture timestamps commonly preserved in authentic files.',
        status: 'inconclusive',
        statusLabel: 'Metadata Missing'
      }
    ],
    limitations: [
      'An Uncertain result reflects model inability to extract conclusive statistical proof, NOT a 50/50 probability that the image is fake.',
      'Never interpret an Uncertain score as confirmation of authenticity or manipulation.',
      'Low signal quality invalidates automated probabilistic classification.'
    ],
    nextActions: [
      'Acquire a higher-resolution version of the media (> 1200px width/height) directly from the primary source.',
      'Inquire whether original capture device or uncompressed PNG/TIFF format is obtainable.',
      'Employ secondary forensic techniques such as Error Level Analysis (ELA) or provenance chain validation.'
    ]
  },

  high: {
    id: 'high',
    modality: 'image',
    modalityLabel: 'Image',
    tier: 'High Risk',
    tierLabel: 'High Risk of AI Generation',
    confidence: 98,
    status: 'high',
    badgeVariant: 'high',
    summary: 'Strong, conclusive statistical signatures of generative synthesis detected across multiple independent spatial, spectral, and semantic inspection modules.',
    evidence: [
      {
        id: 'img-ev-1',
        title: 'Diffusion Noise De-noising Signature',
        finding: '99.2% match with latent diffusion fingerprint',
        detail: 'Characteristic high-dimensional covariance patterns corresponding to iterative Gaussian de-noising steps detected across mid-frequencies.',
        status: 'fail',
        statusLabel: 'Synthetic Signature'
      },
      {
        id: 'img-ev-2',
        title: 'Anatomical & Semantic Asymmetry',
        finding: 'Non-Euclidean textures and melting in fine structures',
        detail: 'Fine repetitive patterns (fabric weaves, background architecture, iris fibers) show synthetic blending and topology breakdown.',
        status: 'fail',
        statusLabel: 'Morphological Anomaly'
      },
      {
        id: 'img-ev-3',
        title: 'Corneal Environment Geometric Mismatch',
        finding: 'Non-matching environmental light maps in eyes',
        detail: 'Reflections in left and right corneas depict contradictory light sources and incompatible room geometry.',
        status: 'fail',
        statusLabel: 'Physically Impossible'
      },
      {
        id: 'img-ev-4',
        title: 'Periodic Spectral Upsampling Peaks',
        finding: 'Prominent grid peaks from transposed convolution',
        detail: '2D Fast Fourier Transform exhibits high-amplitude spikes at regular frequency intervals characteristic of generative decoder heads.',
        status: 'fail',
        statusLabel: 'Decoder Grid Found'
      }
    ],
    limitations: [
      'High Risk indicates statistical consistency with diffusion models (e.g., Midjourney, Flux, Stable Diffusion, DALL-E).',
      'Does not replace authoritative human investigative confirmation where legal or reputational repercussions exist.',
      'Model evaluates visual indicators; adversarial post-processing can modify specific feature metrics.'
    ],
    nextActions: [
      'Treat this image as synthetically generated or substantially manipulated.',
      'Do not publish or rely upon this image in high-stakes contexts without independent verification.',
      'Inspect metadata for C2PA / Content Credentials provenance to check for cryptographic origin stamps.'
    ]
  }
};

export const VIDEO_RESULTS = {
  low: {
    id: 'low',
    modality: 'video',
    modalityLabel: 'Video',
    tier: 'Low Risk',
    tierLabel: 'Low Risk of AI Generation',
    confidence: 93,
    status: 'low',
    badgeVariant: 'low',
    summary: 'Analyzed video exhibits natural inter-frame optical flow vectors, continuous sensor PRNU noise across I-frames, and standard hardware camera encoder container structures.',
    evidence: [
      {
        id: 'vid-ev-1',
        title: 'Frame-Level Pixel Artifacts',
        finding: 'Homogeneous sensor PRNU across extracted keyframes',
        detail: 'Extracted intra-coded frames (I-frames) reveal uniform silicon sensor noise distributions without generative pixel smoothing or diffusion de-noising residual traces.',
        status: 'pass',
        statusLabel: 'Natural Sensor Noise'
      },
      {
        id: 'vid-ev-2',
        title: 'Temporal Inconsistencies',
        finding: 'Continuous optical flow and coherent 3D landmark trajectory',
        detail: 'Facial landmarks, eyelid closure cycles (micro-blinks), and head pose kinematics adhere to continuous Newtonian biomechanical constraints across 180 analyzed frames.',
        status: 'pass',
        statusLabel: 'Motion Coherent'
      },
      {
        id: 'vid-ev-3',
        title: 'Temporal Inconsistencies (Lighting)',
        finding: 'Stable inter-frame illumination continuity',
        detail: 'Specular highlights on moving surfaces remain temporally coherent without the stochastic inter-frame luminance flicker characteristic of recurrent frame generators.',
        status: 'pass',
        statusLabel: 'Stable Photometry'
      },
      {
        id: 'vid-ev-4',
        title: 'Metadata & Provenance Verification',
        finding: 'Valid hardware capture atoms and camera encoder headers',
        detail: 'Standard H.264/AVC GOP (Group of Pictures) cadence with legitimate camera vendor metadata atoms and strictly synchronized audio-video timecodes.',
        status: 'pass',
        statusLabel: 'Hardware Provenance'
      }
    ],
    limitations: [
      'A Low Risk score demonstrates the absence of generative neural synthesis traces, but does not verify that source scenes were unscripted or unedited.',
      'High-grade analog re-recording (pointing a camera at a monitor) can obscure synthetic video signatures.',
      'Authentix video analysis is a probabilistic decision-support metric and not a legal proof of recording provenance.'
    ],
    nextActions: [
      'Video presents consistent indicators of genuine physical optical capture.',
      'If validating high-impact news footage, confirm timestamp correlation with external weather or event benchmarks.',
      'Retain original video file container with intact atoms for archival verification.'
    ]
  },

  medium: {
    id: 'medium',
    modality: 'video',
    modalityLabel: 'Video',
    tier: 'Medium Risk',
    tierLabel: 'Suspicious / Mixed Indicators Detected',
    confidence: 74,
    status: 'medium',
    badgeVariant: 'medium',
    summary: 'Localized temporal boundary jitter and subtle facial region smoothing detected. Findings suggest selective reenactment, facial filter retouching, or hybrid post-production.',
    evidence: [
      {
        id: 'vid-ev-1',
        title: 'Frame-Level Pixel Artifacts',
        finding: 'Differential texture smoothing in central face region',
        detail: 'Facial skin surfaces exhibit suppressed high-frequency texture compared to sharp background grain, consistent with facial enhancement or neural boundary blending.',
        status: 'warning',
        statusLabel: 'Localized Smoothing'
      },
      {
        id: 'vid-ev-2',
        title: 'Temporal Inconsistencies',
        finding: 'Subtle optical flow vector anomalies at hairline boundary',
        detail: 'Inter-frame optical flow vectors show intermittent micro-jitter during rapid head turns between frames 42 and 68.',
        status: 'warning',
        statusLabel: 'Boundary Jitter'
      },
      {
        id: 'vid-ev-3',
        title: 'Temporal Inconsistencies (Phoneme Sync)',
        finding: 'Marginal 42ms audiovisual desynchronization',
        detail: 'Lip contour opening and closing timing slightly lags audio phonetic transients, indicating potential secondary dubbing or partial lip-sync re-synthesis.',
        status: 'warning',
        statusLabel: 'Lip Sync Disparity'
      },
      {
        id: 'vid-ev-4',
        title: 'Metadata & Provenance Verification',
        finding: 'Re-muxed container with omitted camera sensor profile',
        detail: 'MP4 container atoms show evidence of software re-encoding (FFmpeg/Adobe encoder flags present) rather than direct-from-sensor hardware recording tags.',
        status: 'warning',
        statusLabel: 'Re-encoded Container'
      }
    ],
    limitations: [
      'Consumer video compression, social media stabilization algorithms, and beauty filters can mimic synthetic temporal jitter.',
      'Variable frame-rate encoding on mobile phones may cause benign audio-video sync divergences.',
      'Medium Risk signals require expert human forensic inspection before making editorial or regulatory claims.'
    ],
    nextActions: [
      'Request the pristine original recording directly from the camera or primary source device.',
      'Perform frame-by-frame scrutiny of ear-to-hairline and collar transitions during motion peaks.',
      'Cross-examine separate audio track channels for independent acoustic synthesis markers.'
    ]
  },

  uncertain: {
    id: 'uncertain',
    modality: 'video',
    modalityLabel: 'Video',
    tier: 'Uncertain',
    tierLabel: 'Inconclusive / Insufficient Signal Fidelity',
    confidence: 53,
    status: 'uncertain',
    badgeVariant: 'uncertain',
    summary: 'Video analysis is inconclusive due to heavy transcoding, severe bitrate starvation, or downscaled spatial resolution that destroys latent inter-frame forensic signatures.',
    evidence: [
      {
        id: 'vid-ev-1',
        title: 'Frame-Level Pixel Artifacts',
        finding: 'Aggressive macroblocking obliterates pixel-level noise',
        detail: 'Severe 16x16 macroblock compression artifacts suppress high-frequency residual noise below the forensic detection threshold.',
        status: 'inconclusive',
        statusLabel: 'Macroblock Distortion'
      },
      {
        id: 'vid-ev-2',
        title: 'Temporal Inconsistencies',
        finding: 'Variable Frame Rate (VFR) causes temporal tracking dropouts',
        detail: 'Extreme frame dropping (> 32% dropped frames) prevents reliable optical flow tracking or biomechanical acceleration modeling between frames.',
        status: 'inconclusive',
        statusLabel: 'Unstable Frame Rate'
      },
      {
        id: 'vid-ev-3',
        title: 'Frame-Level Pixel Artifacts (Resolution)',
        finding: 'Effective resolution (< 480p) insufficient for facial analysis',
        detail: 'Facial region contains fewer than 80x80 pixels, precluding geometric corneal reflection or micro-texture synthesis verification.',
        status: 'inconclusive',
        statusLabel: 'Resolution Deficit'
      },
      {
        id: 'vid-ev-4',
        title: 'Metadata & Provenance Verification',
        finding: 'Messaging platform transcode with all capture metadata stripped',
        detail: 'Container metadata reflects multi-generation social network re-compression without origin timestamps or device information.',
        status: 'inconclusive',
        statusLabel: 'Metadata Stripped'
      }
    ],
    limitations: [
      'An Uncertain verdict indicates degraded input quality, NOT equal odds of authenticity versus synthetic generation.',
      'Forensic algorithms cannot reconstruct destroyed high-frequency motion vectors or missing keyframe data.',
      'Never cite an Uncertain score as validation of content legitimacy.'
    ],
    nextActions: [
      'Source an uncompressed or high-bitrate master file (> 1080p resolution, constant frame rate).',
      'Confirm the initial transmission chain to bypass messaging app transcoding compression.',
      'Seek corroborating independent camera angles or contemporaneous audio feeds.'
    ]
  },

  high: {
    id: 'high',
    modality: 'video',
    modalityLabel: 'Video',
    tier: 'High Risk',
    tierLabel: 'High Risk of AI Generation',
    confidence: 97,
    status: 'high',
    badgeVariant: 'high',
    summary: 'Conclusive generative video synthesis detected. Evidence includes anomalous temporal flickering, unnatural blink dynamics, boundary warping, and synthetic frame generation signatures.',
    evidence: [
      {
        id: 'vid-ev-1',
        title: 'Frame-Level Pixel Artifacts',
        finding: 'Generative diffusion noise signatures across keyframes',
        detail: 'Spatial inspection reveals characteristic latent diffusion de-noising covariance and texture morphing along ear lobes, iris borders, and complex backgrounds.',
        status: 'fail',
        statusLabel: 'Synthetic Diffusion Fingerprint'
      },
      {
        id: 'vid-ev-2',
        title: 'Temporal Inconsistencies (Kinematics)',
        finding: 'Abnormal eye blink cycles and gaze vector drift',
        detail: 'Involuntary micro-saccades absent; eyelid closure displays unnatural morphing and temporal phase discontinuities incompatible with human ocular physiology.',
        status: 'fail',
        statusLabel: 'Physiological Anomaly'
      },
      {
        id: 'vid-ev-3',
        title: 'Temporal Inconsistencies (Warping)',
        finding: 'Inter-frame boundary warping and texture flickering',
        detail: 'High-frequency temporal flickering detected along jawline and teeth contours, characteristic of autoencoder latent space interpolation.',
        status: 'fail',
        statusLabel: 'Latent Flicker Detected'
      },
      {
        id: 'vid-ev-4',
        title: 'Metadata & Provenance Verification',
        finding: 'Non-standard GOP structure and missing hardware timestamps',
        detail: 'Synthetic video container structure lacks hardware frame presentation timestamps (PTS/DTS) and standard camera sensor quantization tables.',
        status: 'fail',
        statusLabel: 'Synthetic Container Cadence'
      }
    ],
    limitations: [
      'High Risk denotes strong statistical agreement with modern generative video models (e.g., Sora, Runway, Kling, DeepFaceLive).',
      'Advanced post-production techniques (motion blur injection, manual grading) may partially mask specific metrics.',
      'Authentix findings must serve as evidentiary support for qualified investigators.'
    ],
    nextActions: [
      'Flag video asset as probable generative synthetic media or deepfake manipulation.',
      'Quarantine or restrict distribution in high-risk broadcast, electoral, or security channels.',
      'Perform cryptographic check for C2PA Content Credentials or digital watermarks (e.g. SynthID).'
    ]
  }
};

export const DOCUMENT_RESULTS = {
  low: {
    id: 'low',
    modality: 'document',
    modalityLabel: 'Document',
    tier: 'Low Risk',
    tierLabel: 'Low Risk of AI Generation',
    confidence: 95,
    status: 'low',
    badgeVariant: 'low',
    summary: 'Analyzed document exhibits high natural burstiness, idiosyncratic syntactic structures, and dynamic perplexity spikes characteristic of authentic human authorship.',
    evidence: [
      {
        id: 'doc-ev-1',
        title: 'Stylometric Irregularities (Burstiness)',
        finding: 'High sentence-length variance and varied pacing',
        detail: 'Sentence lengths oscillate naturally between 4 and 46 words with organic cadence; syntactic diversity index conforms to human authoring distribution.',
        status: 'pass',
        statusLabel: 'Natural Pacing & Burstiness'
      },
      {
        id: 'doc-ev-2',
        title: 'Stylometric Irregularities (Vocabulary)',
        finding: 'Rich lexical diversity with authentic personal idioms',
        detail: 'Type-Token Ratio (TTR) is high; vocabulary includes domain-specific colloquialisms, varied active voice formulations, and uninhibited phrasing.',
        status: 'pass',
        statusLabel: 'Organic Lexicon'
      },
      {
        id: 'doc-ev-3',
        title: 'Structural Irregularities (Perplexity)',
        finding: 'Dynamic perplexity profile across paragraphs',
        detail: 'N-gram perplexity values exhibit expected peaks around non-standard metaphorical formulations and specialized reasoning jumps, typical of human cognition.',
        status: 'pass',
        statusLabel: 'Dynamic Perplexity'
      },
      {
        id: 'doc-ev-4',
        title: 'Structural Irregularities (Cohesion)',
        finding: 'Organic rhetorical transitions and conceptual tangents',
        detail: 'Absence of rigid five-paragraph template structuring; transitions evolve contextually rather than relying on formulaic bridge phrases.',
        status: 'pass',
        statusLabel: 'Human Rhetorical Flow'
      }
    ],
    limitations: [
      'A Low Risk score indicates human-like stylometric variance, but cannot identify whether factual claims within the text are true.',
      'Human writers using grammar-checking tools (e.g., Grammarly) may exhibit slight homogenization without being AI generated.',
      'Authentix evaluates stylometric and structural patterns, not legal copyright or intellectual ownership.'
    ],
    nextActions: [
      'Document stylometrics conform to typical human composition patterns.',
      'Proceed with standard editorial or factual verification workflows.',
      'Archive document analysis metrics with version hash for audit compliance.'
    ]
  },

  medium: {
    id: 'medium',
    modality: 'document',
    modalityLabel: 'Document',
    tier: 'Medium Risk',
    tierLabel: 'Suspicious / Mixed Indicators Detected',
    confidence: 72,
    status: 'medium',
    badgeVariant: 'medium',
    summary: 'Mixed stylometric markers detected. Analysis indicates hybrid authorship, such as human text rewritten by an LLM or synthetic sections spliced into authentic prose.',
    evidence: [
      {
        id: 'doc-ev-1',
        title: 'Stylometric Irregularities (Pacing Variance)',
        finding: 'Abrupt drop in sentence-length variance in sections 2-4',
        detail: 'Opening paragraph shows high lexical diversity (TTR 0.74), but subsequent paragraphs show uniform 18-22 word sentences with flattened syntactic entropy.',
        status: 'warning',
        statusLabel: 'Sectional Discontinuity'
      },
      {
        id: 'doc-ev-2',
        title: 'Stylometric Irregularities (Vocabulary)',
        finding: 'Recurrence of characteristic LLM transition formulas',
        detail: 'Clusters of stereotypical assistive phrasing detected ("Furthermore", "It is crucial to consider", "A multifaceted approach") amidst informal prose.',
        status: 'warning',
        statusLabel: 'Formulaic Phrasing'
      },
      {
        id: 'doc-ev-3',
        title: 'Structural Irregularities (Perplexity)',
        finding: 'Bimodal perplexity distribution between sections',
        detail: 'Statistical test indicates two divergent generating distributions: one human-like high-entropy section and one low-entropy smoothed section.',
        status: 'warning',
        statusLabel: 'Bimodal Entropy'
      },
      {
        id: 'doc-ev-4',
        title: 'Structural Irregularities (Rhetoric)',
        finding: 'Symmetric paragraph sizing with formulaic wrap-ups',
        detail: 'Body paragraphs adhere strictly to identical structural templates (claim, elaboration, summary sentence) characteristic of prompt-assisted outlining.',
        status: 'warning',
        statusLabel: 'Template Structuring'
      }
    ],
    limitations: [
      'Rigid corporate or legal writing styles naturally display lower burstiness and may trigger false positive mixed indicators.',
      'Non-native English writers often utilize repetitive transition formulas that resemble LLM stylometrics.',
      'Medium Risk signals should guide human review and must not be used to automatically penalize authors.'
    ],
    nextActions: [
      'Inquire whether author utilized AI brainstorming, translation, or sentence-level paraphrasing tools.',
      'Review author previous verified writing samples to establish their natural baseline stylometric profile.',
      'Examine flagged sections manually for generic platitudes versus concrete firsthand knowledge.'
    ]
  },

  uncertain: {
    id: 'uncertain',
    modality: 'document',
    modalityLabel: 'Document',
    tier: 'Uncertain',
    tierLabel: 'Inconclusive / Insufficient Signal Fidelity',
    confidence: 49,
    status: 'uncertain',
    badgeVariant: 'uncertain',
    summary: 'Document analysis is inconclusive. The input sample is either too brief for statistical convergence or contains non-standard text structures that confound stylometric modeling.',
    evidence: [
      {
        id: 'doc-ev-1',
        title: 'Stylometric Irregularities (Length)',
        finding: 'Sample length below forensic statistical threshold',
        detail: 'Text contains fewer than 150 words; burstiness and lexical diversity metrics require minimum sample volume to achieve statistical confidence.',
        status: 'inconclusive',
        statusLabel: 'Sub-Threshold Length'
      },
      {
        id: 'doc-ev-2',
        title: 'Stylometric Irregularities (Syntax)',
        finding: 'Fragmented syntax or bulleted notation',
        detail: 'Text consists predominantly of bulleted lists or sentence fragments, which cannot be accurately modeled with continuous n-gram perplexity.',
        status: 'inconclusive',
        statusLabel: 'Non-Linear Syntax'
      },
      {
        id: 'doc-ev-3',
        title: 'Structural Irregularities (Perplexity)',
        finding: 'High proportion of specialized technical terminology or code',
        detail: 'Domain-specific acronyms and formulaic code snippets artificially skew perplexity models, generating ambiguous classification boundaries.',
        status: 'inconclusive',
        statusLabel: 'Domain Jargon Skew'
      },
      {
        id: 'doc-ev-4',
        title: 'Structural Irregularities (Format)',
        finding: 'Uncalibrated formatting and token layout',
        detail: 'Absence of continuous paragraph structure inhibits evaluation of rhetorical transitions and thematic evolution.',
        status: 'inconclusive',
        statusLabel: 'Unstructured Layout'
      }
    ],
    limitations: [
      'Short text snippets (< 250 words) possess high variance and cannot yield reliable statistical determinations.',
      'An Uncertain result indicates insufficient textual data, not a balanced likelihood of AI generation.',
      'Technical manuals, code listings, and recipes naturally confound prose-oriented NLP detectors.'
    ],
    nextActions: [
      'Provide a more extensive continuous text excerpt (> 300 words of standard prose).',
      'Remove bulleted lists, code blocks, and bibliographic citations prior to stylometric evaluation.',
      'Rely on manual contextual review for brief communication assets (emails, social posts).'
    ]
  },

  high: {
    id: 'high',
    modality: 'document',
    modalityLabel: 'Document',
    tier: 'High Risk',
    tierLabel: 'High Risk of AI Generation',
    confidence: 98,
    status: 'high',
    badgeVariant: 'high',
    summary: 'Conclusive markers of large language model generation detected. The document exhibits uniformly suppressed perplexity, low burstiness, formulaic hedging, and synthetic structural symmetry.',
    evidence: [
      {
        id: 'doc-ev-1',
        title: 'Stylometric Irregularities (Burstiness)',
        finding: 'Uniform sentence length and rhythmic homogeneity',
        detail: 'Sentence lengths are strictly clustered around 19 ± 3 words across the entire document; natural human rhythm variance (burstiness) is virtually absent.',
        status: 'fail',
        statusLabel: 'Suppressed Burstiness'
      },
      {
        id: 'doc-ev-2',
        title: 'Stylometric Irregularities (Vocabulary)',
        finding: 'Low lexical entropy and recurring autoregressive patterns',
        detail: 'Vocabulary choices consistently match top-k model predictions; high frequency of standard LLM filler constructs ("In today\'s fast-paced world", "It is important to remember").',
        status: 'fail',
        statusLabel: 'Synthetic Lexical Distribution'
      },
      {
        id: 'doc-ev-3',
        title: 'Structural Irregularities (Perplexity)',
        finding: 'Consistently flattened, near-zero perplexity curve',
        detail: 'Log-probability evaluation indicates extremely low surprise across every paragraph, conforming to greedy-sampled autoregressive transformer outputs.',
        status: 'fail',
        statusLabel: 'Unnaturally Flat Perplexity'
      },
      {
        id: 'doc-ev-4',
        title: 'Structural Irregularities (Rhetoric)',
        finding: 'Rigid symmetrical thesis-body-conclusion scaffolding',
        detail: 'Every paragraph follows identical internal logic: balanced introductory statement, two equal-length supporting clauses, and a neutral summary aphorism.',
        status: 'fail',
        statusLabel: 'Rigid LLM Rhetorical Architecture'
      }
    ],
    limitations: [
      'High Risk indicates statistical convergence with autoregressive transformer models (e.g. GPT-4, Claude, Gemini, Llama).',
      'Extensively edited AI text with human interjections may attenuate specific stylometric signals.',
      'Findings must serve as investigative evidence and not autonomous proof in academic or administrative decisions.'
    ],
    nextActions: [
      'Treat document as highly probable automated or AI-generated composition.',
      'Request documented drafting history, version control commits, or timestamped outlines.',
      'Conduct an oral interview or structured questioning to verify personal comprehension of submitted concepts.'
    ]
  }
};

// Catalog grouped by modality
export const MODALITY_RESULTS = {
  image: IMAGE_RESULTS,
  video: VIDEO_RESULTS,
  document: DOCUMENT_RESULTS
};

// Backward-compatible default export mapping to image modality
export const MOCK_RESULTS = {
  ...IMAGE_RESULTS
};
